import Farmer from "../models/farmer.models.js";
import Order from "../models/order.models.js";
import Product from "../models/product.models.js";
import Shopkeeper from "../models/shopkeeper.models.js";



// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, imageUrl, stock, category } = req.body
        const shopkeeper = req.shopkeeper;
        const product = await Product.create({
            name, 
            description, 
            price, 
            image : imageUrl, 
            stock, 
            category,
            shopkeeper: shopkeeper._id
        });

        let products = shopkeeper.products;
        products.push(product._id);

        await Shopkeeper.updateOne(
            {_id: shopkeeper._id},
            {$set:{products:products}}
        )
        
        console.log("Product created successfully")
        console.log(product);
        res.status(201).send({ post: "Product created successfully", productid: product._id.toString() });
    } catch (error) {
        res.status(500).send({ error: 'Data not inserted', message: error.message });
    }
}



// Get all products
const getProducts = async (req, res) => {
    try {
        
        const products = await Product.find();

        let productsAsObject = [];

        const productsPromises = products.map(async (postId) => {
            let product = await Product.findById(postId);
            return product;
        });

        Promise.all(productsPromises)
            .then((productObjArrays) => {
                productsAsObject = [...productsAsObject, ...productObjArrays];
                return res.status(201).send(productsAsObject);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                return res.status(500).send('Internal Server Error');
            });

    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}


// Get current shopkeeper products
const getCurrentShopkeeperProducts = async (req, res) => {
    try {
        
        const products = req.shopkeeper.products;

        let productsAsObject = [];

        const productsPromises = products.map(async (postId) => {
            let product = await Product.findById(postId);
            return product;
        });

        Promise.all(productsPromises)
            .then((productObjArrays) => {
                productsAsObject = [...productsAsObject, ...productObjArrays];
                console.log(productsAsObject);
                return res.status(201).send(productsAsObject);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                return res.status(500).send('Internal Server Error');
            });

    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}


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
        let {imageUrl} = req.body;
        const shopkeeper = req.shopkeeper;
        let products = shopkeeper.products;
        if (products.indexOf(req.params.id) === -1) {
            return res.status(402).send({ message: "Only Products Owner can Edit this post" });
        }
        else {
            if (!imageUrl) {
                products = products.filter((item) => item._id !== req.params.id)
                const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
                if (!product) {
                    return res.status(404).send('Product not found');
                }
                products.push(product);
                await Shopkeeper.updateOne(
                    {_id: shopkeeper._id},
                    {$set:{products:products}}
                )
                return res.status(200).send(product);
            }
            else {
                const product = await Product.findById(req.params.id);
                if (!product) {
                    return res.status(404).send('Product not found');
                }
                products = products.filter((item) => item._id !== req.params.id)
                let info = {
                    ...req.body,
                    productImage: imageUrl
                }
                const updatedProduct = await Product.findByIdAndUpdate(req.params.id, info, { new: true, runValidators: true });
                products.push(updatedProduct);
                await Shopkeeper.updateOne(
                    {_id: shopkeeper._id},
                    {$set:{products:products}}
                )
                return res.status(200).send(updatedProduct);
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

// Delete product by ID
const deleteProduct = async (req, res) => {
    try {
        const shopkeeper = req.shopkeeper;
        let products = shopkeeper.products;
        if (products.indexOf(req.params.id) === -1) {
            return res.status(402).send({ message: "Only Products Owner can Delete this post" });
        }
        else {
            // some small problem
            products = products.filter((item) => item !== req.params.id);
            await Shopkeeper.updateOne(
                {_id: shopkeeper._id},
                {$set:{products:products}}
            )
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) {
                return res.status(404).send('Product not found');
            }
            res.status(200).send('Product deleted');
        }
    } catch (error) {
        res.status(500).send(error);
    }
}


// give a review
const giveReview = async (req, res) => {
    try {
        const {description, rating, imageUrl} = req.body;
        const farmer = req.farmer;
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(401).send("Post not found");
        let reviews = product.reviews;
        let review = {
            createdBy: farmer._id,
            description,
            rating,
            image:imageUrl
        }
        reviews.push(review);
        const updatedProduct = await Product.updateOne(
            { _id: req.params.id },
            { $set: { reviews: reviews } }
        )
        return res.status(200).send(updatedProduct);
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}

// edit a review
const updateReview = async (req, res) => {
    try {
        const farmer = req.farmer;
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(401).send("Post not found");
        let reviews = product.reviews;
        const reviewId = req.params.reviewId;
        let review = reviews.filter((item) => item._id === reviewId)[0]
        if(!review) return res.status(402).send("Review not found");
        // some problem is there
        if(review.createdBy !== farmer._id) return res.status(401).send("You cannot edit this review");
        
        reviews = reviews.filter((item) => item._id !== reviewId)

        review.image = (req.body.imageUrl) ? req.body.imageUrl : review.image;
        review.description = (req.body.description) ? req.body.description : review.description;
        review.rating = (req.body.rating) ? req.body.rating : review.rating;
        reviews.push(review);
        
        const updatedProduct = await Product.updateOne(
            { _id: req.params.id },
            { $set: { reviews: reviews } }
        )
        return res.status(200).send(updatedProduct);
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}
// delete a review
const deleteReview = async (req, res) => {
    try {
        const farmer = req.farmer;
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(401).send("Post not found");
        let reviews = product.reviews;
        const reviewId = req.params.reviewId;
        let review = reviews.filter((item) => item._id === reviewId)[0]
        if(!review) return res.status(402).send("Review not found");
        // some problem is there
        if(review.createdBy !== farmer._id) return res.status(401).send("You cannot delete this review");
        
        reviews = reviews.filter((item) => item._id !== reviewId)
        const updatedProduct = await Product.updateOne(
            { _id: req.params.id },
            { $set: { reviews: reviews } }
        )
        return res.status(200).send(updatedProduct);
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}

// get reviews
const getReviews = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(401).send("Product not found");
        const reviews = product.reviews;
        return res.status(200).send(reviews);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

// rating to product
const ratingProduct = async (req, res) => {
    try { 
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(401).send("Product not found");
        let rating = product.rating;
        rating = rating.filter((item) => item.ratedBy !== req.farmer._id);
        rating.push({ratedBy: farmer._id, rate : req.body.rating});

        const updatedProduct = await Product.updateOne(
            { _id: req.params.id },
            { $set: { rating: rating } }
        )
        return res.status(200).send(rating)

    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

// add product to the cart
const addProductToCart = async (req, res) => {
    try {
        const farmer = req.farmer;
        let cart = farmer.cart;
        cart = cart.filter((item) => item.product !== req.params.id)
        cart.push({product: req.params.id, quantity: req.body.quantity});
        const updatedCart = await Farmer.updateOne(
            { _id: farmer._id },
            { $set: { cart: cart } }
        )
        
        return res.status(200).send(updatedCart.cart);
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}

// remove product from the cart
const removeProductFromCart = async (req, res) => {
    try {
        const farmer = req.farmer;
        let cart = farmer.cart;
        cart = cart.filter((item) => item.product !== req.params.id)
        const updatedCart = await Farmer.updateOne(
            { _id: farmer._id },
            { $set: { cart: cart } }
        )
        
        return res.status(200).send(updatedCart.cart);
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}

// get cart items
const getCartItems = async (req, res) => {
    try {
        const farmer = req.farmer;
        let cart = farmer.cart;

        let cartItemsAsObject = [];

        const cartPromises = cart.map(async (cartItem) => {
            let product = await Product.findById(cartItem.product);
            return {product: product, quantity: cartItem.quantity};
        });

        Promise.all(cartPromises)
            .then((productObjArrays) => {
                cartItemsAsObject = [...cartItemsAsObject, ...productObjArrays];
                return res.status(201).send(cartItemsAsObject);
            })
            .catch((error) => {
                console.error('Error fetching cart items:', error);
                return res.status(500).send('Internal Server Error');
            });
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}


// place order
const placeOrder = async (req, res) => {
    try {
        const farmer = req.farmer;
        let orders = farmer.orders;
        // orders not updated on shopkeepers side
        let orderInfo = {
            items: req.body.items,
            orderedBy: farmer._id,
            amount: req.body.amount,
            GST: 10,
            platformFee: 2
        }

        const order = await Order.create(orderInfo);
        orders.push(order._id);
        const updated = await Farmer.updateOne(
            { _id: farmer._id },
            { $set: { orders: orders } }
        )
        
        return res.status(200).send({message: "Order placed successfully", order: order})
        
        
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}

// cancle order
const cancleOrder = async (req, res) => {
    try {
        const farmer = req.farmer;
        let orders = farmer.orders;
        const orderId = req.params.id;
        // orders not updated on shopkeepers side
        
        let order = orders.filter((item) => item === orderId)[0];
        order.status = 'Cancled';
        orders = orders.filter((item) => item !== orderId)
        orders.push(order)
        const updated = await Farmer.updateOne(
            { _id: farmer._id },
            { $set: { orders: orders } }
        )
        
        return res.status(200).send({message: "Order cancled"})
        
        
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}

// dispatch order
const dispatchOrder = async (req, res) => {
    try {
        const farmer = req.farmer;
        let orders = farmer.orders;
        const orderId = req.params.id;
        // orders not updated on shopkeepers side
        
        let order = orders.filter((item) => item === orderId)[0];
        order.status = 'Dispatched';
        orders = orders.filter((item) => item !== orderId)
        orders.push(order)
        const updated = await Farmer.updateOne(
            { _id: farmer._id },
            { $set: { orders: orders } }
        )

        return res.status(200).send({message: "Order dispatched"})


    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}

// deliver order
const deliverOrder = async (req, res) => {
    try {
        const farmer = req.farmer;
        let orders = farmer.orders;
        const orderId = req.params.id;
        // orders not updated on shopkeepers side
        
        let order = orders.filter((item) => item === orderId)[0];
        order.status = 'Delivered';
        orders = orders.filter((item) => item !== orderId)
        orders.push(order)
        const updated = await Farmer.updateOne(
            { _id: farmer._id },
            { $set: { orders: orders } }
        )

        return res.status(200).send({message: "Order Delivered"})


    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}


export {
    createProduct,
    getProducts,
    getCurrentShopkeeperProducts,
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