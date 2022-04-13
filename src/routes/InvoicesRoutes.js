const express = require("express");
const router = express.Router();

const {InvoicesController} = require("../controllers");

router
    .route("/:idInvoice/send")
    .post(InvoicesController.sendInvoice);

router
    .route("/")
    .get(InvoicesController.getInvoices)

router
    .route("/:idInvoice")
    .get(InvoicesController.getInvoiceById)
    .delete(InvoicesController.deleteInvoice)

module.exports = router;