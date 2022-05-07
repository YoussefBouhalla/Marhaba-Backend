require('dotenv').config()
const {UserServices} = require('../services');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const handleRegister = async (req,res) => {
    try {
        await UserServices.create(req.value);
        res.status(200).json({meassage: "User created successfully!"});
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message});
    }
}

const handleLogin = async (req,res) => {
    if(!req.body.email) throw res.status(400).json({error: "enter an email"});

    try {
        const user = await (await UserServices.getSingle({email: req.body.email}));
    
        if(!user) {
            res.status(200).json({error: {email: "email doesn't exist"}})
        }else {
            if (!req.body.password) {
                res.status(200).json({error: { password: "password is incorrect"}});
            }else {
                bcrypt.compare(req.body.password,user.password).then(result => {
                    if (!result) {
                        res.status(200).json({error: { password: "password is incorrect"}});
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

const getUsersCount = async (req,res) => {
    try {
        const usersCount = await UserServices.getCount();
        res.status(200).json({usersCount : usersCount._count.user_id})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getClientsCount = async (req,res) => {
    try {
        const clientsCount = await UserServices.getCount({role: 'client'});
        res.status(200).json({clientsCount : clientsCount._count.role})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getDeliverersCount = async (req,res) => {
    try {
        const deliverersCount = await UserServices.getCount({role: 'deliverer'});
        res.status(200).json({deliverersCount : deliverersCount._count.role})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getDeliverers = async (req,res) => {
    try {
        const deliverers = await UserServices.getAll('deliverer');
        res.status(200).json(deliverers)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getDilevererById = async (req,res) => {
    const id = parseInt(req.params.idDeliverer);
    try {
        const deliverer = await UserServices.getSingle({id , role: 'deliverer'});
        res.status(200).json(deliverer)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const searchForDeliverer = async (req,res) => {
    try {
        const deliverer = await UserServices.filterByName(req.body.firstName);
        res.status(200).json(deliverer)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

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
