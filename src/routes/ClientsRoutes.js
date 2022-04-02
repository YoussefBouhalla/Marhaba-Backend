const express = require("express");
const router = express.Router();

const {UsersController} = require("../controllers");

router
    .route("/count")
    .get(UsersController.getClientsCount);

module.exports = router;