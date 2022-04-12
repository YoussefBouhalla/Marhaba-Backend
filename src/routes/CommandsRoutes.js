const express = require("express");
const router = express.Router();

const {CommandsController} = require("../controllers");

router 
    .route("/:idClient")
    .get(CommandsController.getClientCommands);
    
router 
    .route("/untaked")
    .get(CommandsController.getUntakedCommands);

router
    .route("/count")
    .get(CommandsController.getCommandsCount);

router
    .route("/nottaken/count")
    .get(CommandsController.getNotTakenCommandsCount);

router
    .route("/delivired/count")
    .get(CommandsController.getDeliviredCommandsCount);

router 
    .route("/:idCommand")
    .get(CommandsController.getCommandNameAndStatus);

router 
    .route("/:idDeliverer/taken/count")
    .get(CommandsController.getDelivererTakenCommandsCount);

router 
    .route("/:idDeliverer/taken")
    .get(CommandsController.getDelivererTakenCommands);

router 
    .route("/:idCommand/untake")
    .put(CommandsController.untakeCommand);

router 
    .route("/:idCommand/take")
    .put(CommandsController.takeCommand);

router 
    .route("/:idCommand/markasdelivering")
    .put(CommandsController.markAsDeliviring);

router 
    .route("/:idCommand/markasdelivered")
    .put(CommandsController.markAsDelivired);

router 
    .route("/search")
    .post(CommandsController.searchForCommand);

router 
    .route("/:idCommand/details")
    .get(CommandsController.getCommandDetails);

module.exports = router;