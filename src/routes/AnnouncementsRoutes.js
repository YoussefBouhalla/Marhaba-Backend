const express = require("express");
const router = express.Router();

const {AnnouncementsController} = require("../controllers");

router
    .route("/search")
    .post(AnnouncementsController.searchForAnnouncements);

router
    .route("/")
    .get(AnnouncementsController.getAnnouncements)
    .post(AnnouncementsController.createAnnouncement);

router
    .route("/order")
    .post(AnnouncementsController.orderAnnouncement);

router
    .route("/count")
    .get(AnnouncementsController.getAnnouncementsCount);

router 
    .route("/:idAnnouncement")
    .put(AnnouncementsController.updateAnnouncement)
    .delete(AnnouncementsController.deleteAnnouncement)

module.exports = router;