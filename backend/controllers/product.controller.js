import CartItem from "../models/cartItem.models.js";
import Farmer from "../models/farmer.models.js";
import Order from "../models/order.models.js";
import Product from "../models/product.models.js";
import Shopkeeper from "../models/shopkeeper.models.js";



// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, images, stock, category } = req.body;

        const shopkeeper = req.shopkeeper;

        const product = await Product.create({
            name,
            description,
            price,
            images: images,
            stock,
            category,
            shopkeeper: shopkeeper._id
        });

        let products = shopkeeper.products;
        products.push(product._id);

        await Shopkeeper.updateOne(
            { _id: shopkeeper._id },
            { $set: { products: products } }
        );

        return res.status(201).send({ message: "Product created successfully", productId: product._id.toString() });

    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).send({ error: 'Failed to create product', message: error.message });
    }
}



// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        // No need to map and query again, 'products' already contains all products
        return res.status(200).send(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).send('Internal Server Error');
    }
}



// Get current shopkeeper products
const getCurrentShopkeeperProducts = async (req, res) => {
    try {
        const products = req.shopkeeper.products;

        // Fetch all products asynchronously
        const productsPromises = products.map(async (productId) => {
            try {
                const product = await Product.findById(productId);
                return product;
            } catch (error) {
                // Handle individual product fetch errors
                console.error(`Error fetching product with ID ${productId}:`, error);
                return null; // or handle differently based on your needs
            }
        });

        // Wait for all product fetch promises to resolve
        const productObjects = await Promise.all(productsPromises);

        // Filter out null or undefined products
        const validProducts = productObjects.filter(product => product !== null && product !== undefined);

        return res.status(200).send(validProducts);
    } catch (error) {
        // Handle any unexpected errors
        console.error('Error fetching shopkeeper products:', error);
        return res.status(500).send('Internal Server Error');
    }
}

const getProductsByShopkeeper = async (req, res) => {

    try {
        const shopkeeperId = req.params.id;

        const products = await Product.find({ shopkeeper: shopkeeperId });
        return res.status(200).send(products);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the products of the shopkeeper." });
    }

};

// Get a product by ID
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        return res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
}


// Update a product by ID
const updateProduct = async (req, res) => {
    try {
        const { imageUrl } = req.body;
        const shopkeeper = req.shopkeeper;
        let products = shopkeeper.products;

        // Check if the shopkeeper owns the product
        if (!products.includes(req.params.id)) {
            return res.status(403).send({ message: "Only product owner can edit this product" });
        }

        let updatedProduct;

        // Determine if the request includes an image update
        if (!imageUrl) {
            // If imageUrl is not provided, update the product without changing the image
            updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        } else {
            // If imageUrl is provided, update the product with the new image URL
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).send('Product not found');
            }

            // Update product info including the new image URL
            const updatedInfo = {
                ...req.body,
                productImage: imageUrl
            };

            updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedInfo, { new: true, runValidators: true });
        }

        // Update shopkeeper's products list with the updated product
        products = products.filter((item) => item !== req.params.id);
        products.push(updatedProduct._id);

        await Shopkeeper.updateOne(
            { _id: shopkeeper._id },
            { $set: { products: products } }
        );

        return res.status(200).send(updatedProduct);

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}


// Delete product by ID
const deleteProduct = async (req, res) => {
    try {
        const shopkeeper = req.shopkeeper;
        const productId = req.params.id;
        let prod = await Product.findById(productId);
        if (!prod) return res.status(404).send("Product not found");

        // Check if the shopkeeper owns the product
        if (!shopkeeper.products.includes(productId)) {
            return res.status(403).send({ message: "Only product owner can delete this product" });
        }

        // Remove the product ID from shopkeeper's products list
        const updatedProducts = shopkeeper.products.filter(item => item.toString() !== productId);

        // Update the shopkeeper with the new products list
        await Shopkeeper.updateOne(
            { _id: shopkeeper._id },
            { $set: { products: updatedProducts } }
        );

        // Delete the product from the database
        const deletedProduct = await Product.findByIdAndDelete(productId);


        return res.status(200).send({ message: "Product deleted successfully" });

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}



// give a review
const giveReview = async (req, res) => {
    try {
        const { description, rating, imageUrl } = req.body;
        const farmer = req.farmer;
        const productId = req.params.id;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        const newReview = {
            createdBy: farmer._id,
            description: description,
            rating: rating,
            image: imageUrl
        };

        product.reviews.push(newReview);

        const updatedProduct = await Product.updateOne(
            { _id: productId },
            { $set: { reviews: product.reviews } }
        );

        return res.status(200).send({ message: "Review added successfully", updatedProduct });

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}


// edit a review
const updateReview = async (req, res) => {
    try {
        const farmer = req.farmer;
        const productId = req.params.id;
        const reviewId = req.params.reviewId;

        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        // Find the review by ID within the product's reviews array
        const reviewIndex = product.reviews.findIndex(review => review._id.toString() === reviewId);
        if (reviewIndex === -1) {
            return res.status(404).send({ message: "Review not found" });
        }

        const review = product.reviews[reviewIndex];

        // Check if the farmer is authorized to edit the review
        if (review.createdBy.toString() !== farmer._id.toString()) {
            return res.status(401).send({ message: "You are not authorized to edit this review" });
        }

        // Update review fields based on request body
        if (req.body.imageUrl) {
            review.image = req.body.imageUrl;
        }
        if (req.body.description) {
            review.description = req.body.description;
        }
        if (req.body.rating) {
            review.rating = req.body.rating;
        }

        // Replace the old review with the updated one
        product.reviews[reviewIndex] = review;

        // Update the product with the new reviews array
        const updatedProduct = await Product.updateOne(
            { _id: productId },
            { $set: { reviews: product.reviews } }
        );

        // Send a success response with the updated product
        return res.status(200).send({ message: "Review updated successfully", updatedProduct });
    } catch (error) {
        // Handle any errors that occur during the process
        return res.status(500).send({ error: error.message });
    }
}

// delete a review
const deleteReview = async (req, res) => {
    try {
        const farmer = req.farmer;
        const productId = req.params.id;
        const reviewId = req.params.reviewId;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        const review = product.reviews.find(review => review._id.toString() === reviewId);
        if (!review) {
            return res.status(404).send({ message: "Review not found" });
        }

        if (review.createdBy.toString() !== farmer._id.toString()) {
            return res.status(401).send({ message: "You are not authorized to delete this review" });
        }

        const updatedReviews = product.reviews.filter(review => review._id.toString() !== reviewId);

        const updatedProduct = await Product.updateOne(
            { _id: productId },
            { $set: { reviews: updatedReviews } }
        );

        return res.status(200).send({ message: "Review deleted successfully", updatedProduct });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}


// get reviews
const getReviews = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send("Product not found");
        const reviews = product.reviews;
        return res.status(200).send(reviews);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

// rate product
const ratingProduct = async (req, res) => {
    try {
        const farmer = req.farmer;
        const productId = req.params.id;
        const ratingValue = req.body.rating;

        if (parseInt(ratingValue) < 1 || parseInt(ratingValue) > 5) {
            return res.status(400).send({ message: "Rating must be between 1 and 5" });
        }

        let product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }
        let isRated = false;
        product.rating = product.rating.map((item) => {
            if (item && item.ratedBy.toString() === farmer._id.toString()) {
                if (item.rate == ratingValue) item = null;
                else item.rate = ratingValue;
                isRated = true;
            }
            return item;
        })

        if (!isRated) product.rating.push({ rate: ratingValue, ratedBy: farmer._id });

        product.rating = product.rating.filter(item => item != null)

        await Product.updateOne(
            { _id: productId },
            { $set: { rating: product.rating } }
        );

        return res.status(200).send({ message: "Product rated successfully" });

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};


// add product to the cart
const addProductToCart = async (req, res) => {
    try {
        const farmer = req.farmer;
        let cart = farmer.cart;
        cart.forEach((item) => {
            if (item.product.toString() === req.params.id) {
                return res.status(201).send("Already added in cart");
            }
        });

        const product = await Product.findById(req.params.id);

        cart.push({ product: product._id, quantity: req.body.quantity ? req.body.quantity : 1, status: "Incart" });
        await Farmer.updateOne(
            { _id: farmer._id },
            { $set: { cart: cart } }
        )

        return res.status(200).send("Product added to cart");
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

// remove product from the cart
const removeProductFromCart = async (req, res) => {
    try {
        const farmer = req.farmer;
        let cart = farmer.cart;
        cart = cart.filter((item) => item.product.toString() !== req.params.id);

        await Farmer.updateOne(
            { _id: farmer._id },
            { $set: { cart: cart } }
        )

        return res.status(200).send("Removed from cart");
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

// get cart items
const getCartItems = async (req, res) => {
    try {
        const farmer = req.farmer;
        let cart = farmer.cart;

        return res.status(201).send(cart);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}



// handle order items on shopkeeper side
const handleOrderItemsOnShopkeeperSide = async (orderInfo) => {
    try {
        let items = orderInfo.items;

        for (const item of items) {
            const shopkeeper = await Shopkeeper.findById(item.product.shopkeeper);
            let orders = shopkeeper.orders;
            orders.push(item._id);
            await Shopkeeper.updateOne(
                { _id: shopkeeper._id },
                { $set: { orders: orders } }
            );
            console.log("Order sent to shopkeeper");
        }

        return { status: 'success', message: 'All orders sent to shopkeepers' };
    } catch (error) {
        throw new Error(`Failed to handle order items on shopkeeper side: ${error.message}`);
    }
}

// place order
const placeOrder = async (req, res) => {
    try {
        const farmer = req.farmer;
        let orders = farmer.orders;
        let items = req.body.items;
        
        let amount = 0;
        
        let orderedItems = await Promise.all(items.map(async id => {
            let cartItem = farmer.cart.find(item => item._id.toString() === id.toString());
            if (cartItem) {
                cartItem.status = "Ordered";
                const product = await Product.findById(cartItem.product);
                cartItem.product = product;
                amount += parseFloat(product.price) * parseInt(cartItem.quantity);
                // let orderItem = await CartItem.create(cartItem);
                return cartItem;
            }
        }));
        
        orderedItems = orderedItems.filter(item => item !== undefined);
        
        let orderInfo = {
            items: orderedItems,
            orderedBy: farmer._id,
            totalAmount: amount,
            GST: 10,
            platformFee: 2
        };
        
        await handleOrderItemsOnShopkeeperSide(orderInfo);
        
        const order = await Order.create(orderInfo);
        orders.push(order._id);
        await Farmer.updateOne(
            { _id: farmer._id },
            { $set: { orders: orders } }
        );

        return res.status(200).send({ message: "Order placed successfully", order: order });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};


// cancle order
const cancleOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        const order = await CartItem.findById(orderId);
        if (!order) {
            return res.status(404).send({ message: "Order not found" });
        }

        await CartItem.updateOne(
            { _id: orderId },
            { $set: { status: 'Cancelled' } }
        )

        return res.status(200).send({ message: "Order Cancelled" })


    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

// dispatch order
const dispatchOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        const order = await CartItem.findById(orderId);
        if (!order) {
            return res.status(404).send({ message: "Order not found" });
        }

        await CartItem.updateOne(
            { _id: orderId },
            { $set: { status: 'Dispatched' } }
        )

        return res.status(200).send({ message: "Order dispatched" })


    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

// deliver order
const deliverOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        const order = await CartItem.findById(orderId);
        if (!order) {
            return res.status(404).send({ message: "Order not found" });
        }

        const updated = await CartItem.updateOne(
            { _id: orderId },
            { $set: { status: 'Delivered' } }
        )

        return res.status(200).send({ message: "Order Delivered" })


    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}


export {
    createProduct,
    getProducts,
    getCurrentShopkeeperProducts,
    getProductsByShopkeeper,
    getProduct,
    updateProduct,
    deleteProduct,
    giveReview,
    updateReview,
    deleteReview,
    getReviews,
    ratingProduct,
    addProductToCart,
    removeProductFromCart,
    getCartItems,
    placeOrder,
    cancleOrder,
    dispatchOrder,
    deliverOrder
}