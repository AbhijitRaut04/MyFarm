const validateShopkeeper = (req, res, next) => {
    const { name, email, password, shopName, location } = req.body;
    if (!name || !email || !password || !shopName || !location) {
        return res.status(400).send('All fields are required');
    }
    next();
};

export default validateShopkeeper;