const express = require("express");
const router = express.Router();

const {UsersController} = require("../controllers");

router
    .route("/login")
    .post(UsersController.handleLogin);

router
    .route("/logout")
    .post(UsersController.handleLogout);

router
    .route("/register")
    .post(UsersController.handleRegister);

router
    .route("/count")
    .get(UsersController.getUsersCount);

router 
    .route("/contact")
    .get(UsersController.getContactMessages)
    .post(UsersController.sendContactMessage)

module.exports = router;