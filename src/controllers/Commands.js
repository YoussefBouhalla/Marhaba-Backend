const createCommand = (req,res) => {}

const getCommandsCount = (req,res) => {}

const getNotTakenCommandsCount = (req,res) => {}

const getDeliviredCommandsCount = (req,res) => {}

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
