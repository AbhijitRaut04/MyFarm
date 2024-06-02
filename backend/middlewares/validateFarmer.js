const validateFarmer = (req, res, next) => {
    const { name, age, location } = req.body;
    console.log(req.body)
    if (!name || !age || !location) {
        return res.status(400).send('All fields are required');
    }
    next();
};

export default validateFarmer;