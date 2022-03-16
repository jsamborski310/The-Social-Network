const router = require('express').Router();
const userRoutes = require('./userRoutes');

router.user('/users', userRoutes); //double-check if it should be router.user or router.users




module.exports = router;