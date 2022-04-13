const {InvoiceServices} = require('../services')

const sendInvoice = (req,res) => {}

const getInvoices = async (req,res) => {
    try {
        const invoices =  await InvoiceServices.getAll();
        res.status(200).json(invoices)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getInvoiceById = async (req,res) => {
    const invoice_id = parseInt(req.params.idInvoice);
    try {
        const invoices =  await InvoiceServices.getSingle(invoice_id);
        res.status(200).json(invoices)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const deleteInvoice = async (req,res) => {
    const invoice_id = parseInt(req.params.idInvoice);
    try {
        await InvoiceServices.deleteI(invoice_id);
        res.status(200).json({message: 'invoice deleted successfully!'})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    sendInvoice,
    getInvoices,
    getInvoiceById,
    deleteInvoice
}
