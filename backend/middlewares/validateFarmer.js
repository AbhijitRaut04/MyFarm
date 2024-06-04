const validateFarmer = (req, res, next) => {
    const { username, email, password, age, location } = req.body;
    if (!username || !email || !password || !age || !location) {
        console.log("All fields required!")
        return res.status(400).send('All fields are required');
    }
    next();
};

export default validateFarmer;