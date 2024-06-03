const validateFarmer = (req, res, next) => {
    const { name, email, password, age, location } = req.body;
    if (!name || !email || !password || !age || !location) {
        return res.status(400).send('All fields are required');
    }
    next();
};

export default validateFarmer;