const {CommandServices , InvoiceServices} = require('../services')

const getCommandsCount = async (req,res) => {
    try {
        let commandsCount = await CommandServices.getCount();
        res.status(200).json({commandsCount :commandsCount._count.command_number})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getNotTakenCommandsCount = async (req,res) => {
    try {
        let takenCommands = await CommandServices.getCount({type: 'taken' , value: false});
        res.status(200).json({takenCommands: takenCommands._count.command_number})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getDeliviredCommandsCount = async(req,res) => {
    try {
        let deliveredCount = await CommandServices.getCount({type: 'status' , value: 'delivered'});
        res.status(200).json({deliveredCount : deliveredCount._count.command_number})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getCommandNameAndStatus = async (req,res) => {
    const command_number = parseInt(req.params.idCommand);
    try {
        let command = await CommandServices.getSingle(command_number , false);
        res.status(200).json(command)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getDelivererTakenCommandsCount = async (req,res) => {
    const deliverer_id = parseInt(req.params.idDeliverer);
    try {
        let delivererCommandsCount = await CommandServices.getCount({type: 'deliverer_id' , value: deliverer_id});
        res.status(200).json({delivererCommandsCount: delivererCommandsCount._count.command_number})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getDelivererTakenCommands = async (req,res) => {
    const deliverer_id = parseInt(req.params.idDeliverer)
    try {
        const delivererCommands = await CommandServices.getAll({deliverer_id});
        res.status(200).json(delivererCommands)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const takeCommand = async (req,res) => {
    const command_number = parseInt(req.params.idCommand);
    try {
        await CommandServices.take(command_number, 6);
        res.status(200).json({message: "taken successfully!"})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const untakeCommand = async (req,res) => {
    const command_number = parseInt(req.params.idCommand);
    try {
        await CommandServices.untake(command_number, 6);
        res.status(200).json({message: "untaken successfully!"})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const markAsDeliviring = async (req,res) => {
    const command_number = parseInt(req.params.idCommand);
    try {
        await CommandServices.updateC(command_number, {status: "deliviring"});
        res.status(200).json({message: "deliviring!"})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const markAsDelivired = async (req,res) => {
    const command_number = parseInt(req.params.idCommand);
    const client_id = parseInt(req.body.client_id);
    try {
        await CommandServices.updateC(command_number, {status: "delivired"});
        await InvoiceServices.create({gl_command_num : command_number , client_id});
        res.status(200).json({message: "delivired!"})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getUntakedCommands = async (req,res) => {
    try {
        const untakedCommands = await CommandServices.getAll({taken: false});
        res.status(200).json(untakedCommands)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const searchForCommand = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getClientCommands = async (req,res) => {
    const client_id = parseInt(req.params.idClient);
    try {
        const clientCommands = await CommandServices.getAll({user_id: client_id});
        res.status(200).json(clientCommands)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getCommandDetails = async (req,res) => {
    const command_number = parseInt(req.params.idCommand);
    try {
        const command = await CommandServices.getSingle(command_number);
        res.status(200).json(command)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getCommandsCount,
    getNotTakenCommandsCount,
    getDeliviredCommandsCount,
    getCommandNameAndStatus,
    getDelivererTakenCommandsCount,
    getDelivererTakenCommands,
    takeCommand,
    untakeCommand,
    markAsDeliviring,
    markAsDelivired,
    getUntakedCommands,
    searchForCommand,
    getClientCommands,
    getCommandDetails
}
