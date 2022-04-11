const express = require("express");
const router = express.Router();

const {JoiValidations} = require('../middlewares')

const {AnnouncementsController} = require("../controllers");

router
    .route("/search")
    .post(AnnouncementsController.searchForAnnouncements);

router
    .route("/")
    .get(AnnouncementsController.getAnnouncements)
    .post(JoiValidations.validateAnnouncement ,AnnouncementsController.createAnnouncement);

router
    .route("/:idAnnouncement/order")
    .post(AnnouncementsController.orderAnnouncement);

router
    .route("/count")
    .get(AnnouncementsController.getAnnouncementsCount);

router 
    .route("/:idAnnouncement")
    .put(AnnouncementsController.updateAnnouncement)
    .delete(AnnouncementsController.deleteAnnouncement)

module.exports = router;