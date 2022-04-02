const express = require("express");
const router = express.Router();

const {UsersController} = require("../controllers");

router
    .route("/")
    .get(UsersController.getDeliverers);

router
    .route("/search")
    .post(UsersController.searchForDeliverer);

router
    .route("/:idDeliverer")
    .get(UsersController.getDilevererById);

router
    .route("/count")
    .get(UsersController.getDeliverersCount);

router
    .route("/commands")
    .get(UsersController.getDelivererAndTakenCommands);


module.exports = router;