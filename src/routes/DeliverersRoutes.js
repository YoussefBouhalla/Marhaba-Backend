const express = require("express");
const router = express.Router();

const {UsersController} = require("../controllers");

router
    .route("/count")
    .get(UsersController.getDeliverersCount);

router
.route("/search")
.post(UsersController.searchForDeliverer);

router
.route("/:idDeliverer")
.get(UsersController.getDilevererById);

router
.route("/:idDeliverer/commands")
.get(UsersController.getDelivererAndTakenCommands);

router
    .route("/")
    .get(UsersController.getDeliverers);

module.exports = router;