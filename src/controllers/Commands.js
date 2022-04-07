const {create, getSingle, getAll, getCount} = require('../services/CommandServices')

const createCommand = async (req,res) => {
    await create('global' , {announ_commands_connections: [{announc_commands: {connect: {command_id : 1}}}] , meals_commands_connections: [{meal_commands: {connect: {command_id : 8}}}]})
    res.status(200).json({message: "created successfully!"})

    // await create('announcement' , {announcement_id : 1})
    // res.status(200).json({message: "created successfully!"})

    // await create('meal' , {meal_id : 11 , quantity: 2 , price: 12})
    // res.status(200).json({message: "created successfully!"})
}

const getCommandsCount = async (req,res) => {
    let commands = await getSingle(3);
    res.status(200).json(commands)
}

const getNotTakenCommandsCount = async (req,res) => {
    let commands = await getAll();
    res.status(200).json(commands)
}

const getDeliviredCommandsCount = async(req,res) => {
    let commands = await getCount();
    res.status(200).json(commands)
}

const getCommandNameAndStatus = (req,res) => {}

const getDelivererTakenCommandsCount = (req,res) => {}

const getDelivererTakenCommands = (req,res) => {}

const takeCommand = (req,res) => {}

const untakeCommand = (req,res) => {}

const markAsDeliviring = (req,res) => {}

const markAsDelivired = (req,res) => {}

const getUntakedCommands = (req,res) => {}

const searchForCommand = (req,res) => {}

const getClientCommands = (req,res) => {}

const getCommandDetails = (req,res) => {}

module.exports = {
    createCommand,
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
