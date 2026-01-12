const router = require('express').Router();
const userController = require('../backend/controllers/user');

router.post("/signup", userController.signup);
module.exports = router;