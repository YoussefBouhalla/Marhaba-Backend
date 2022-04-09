require('dotenv').config()
const {JoiUtils} = require('../utils');
const {UserServices} = require('../services');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const handleRegister = async (req,res) => {
    try {
        await UserServices.create(req.value);
        res.status(200).json({meassage: "User created successfully!"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const handleLogin = async (req,res) => {
    if(!req.body.email) throw res.status(400).json({error: "enter an email"});

    try {
        const user = await (await UserServices.getSingle({email: req.body.email}));
    
        if(!user) {
            res.status(400).json({error: "email doesn't exist"})
        }else {
            if (!req.body.password) {
                res.status(400).json({error: "password is incorrect"});
            }else {
                bcrypt.compare(req.body.password,user.password).then(result => {
                    if (!result) {
                        res.status(400).json({error: "password is incorrect"});
                    }else {
                        const accessToken = jwt.sign({id: user.user_id, role: user.role} , process.env.ACCESS_TOKEN_SECRET);
                        res.status(200).json({accessToken});
                    }
                })
            }
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const handleLogout = (req,res) => {}

const sendContactMessage = (req,res) => {}

const getContactMessages = (req,res) => {}

const getUsersCount = (req,res) => {}

const getClientsCount = (req,res) => {}

const getDeliverersCount = (req,res) => {}

const getDeliverers = (req,res) => {}

const getDilevererById = (req,res) => {}

const searchForDeliverer = (req,res) => {}

const getDelivererAndTakenCommands = (req,res) => {}

module.exports = {
    handleRegister,
    handleLogin,
    handleLogout,
    sendContactMessage,
    getContactMessages,
    getUsersCount,
    getClientsCount,
    getDeliverersCount,
    getDeliverers,
    getDilevererById,
    searchForDeliverer,
    getDelivererAndTakenCommands
}
