const express = require("express");
const router = express.Router();

const {UsersController} = require("../controllers");

const {JoiValidations , hashPassword} = require('../middlewares')

router
    .route("/login")
    .post(UsersController.handleLogin);

router
    .route("/logout")
    .post(UsersController.handleLogout);

router
    .route("/register")
    .post(JoiValidations.validateUser , hashPassword ,UsersController.handleRegister);

router
    .route("/count")
    .get(UsersController.getUsersCount);

router 
    .route("/contact")
    .get(UsersController.getContactMessages)
    .post(UsersController.sendContactMessage)

module.exports = router;