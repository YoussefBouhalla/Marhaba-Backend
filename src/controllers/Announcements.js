const {AnnouncementServices, CommandServices} = require('../services')

const createAnnouncement = async (req,res) => {
    try {
        await AnnouncementServices.create(req.value);
        res.status(200).json({meassage: "Announcement created successfully!"});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

const getAnnouncements = async (req,res) => {
    try {
        let announcements = await AnnouncementServices.getAll();
        res.status(200).json(announcements);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

const orderAnnouncement = async (req,res) => {
    const quantity = parseInt(req.body.quantity);
    const price = parseInt(req.body.price);
    const announcement_id = parseInt(req.params.idAnnouncement)
    let globalCommand;

    const globalCommands = await CommandServices.checkCommandAvailability(6);

    if(globalCommands.length === 0){
        globalCommand = await CommandServices.create('global' , {user_id: 6})
    }

    await CommandServices.create('announcement' , {announcement_id , quantity, price , command_number: globalCommands.length > 0 ? globalCommands[0].command_number : globalCommand.command_number })
    res.status(200).json({message: "created successfully!"})
}

const searchForAnnouncements = async (req,res) => {
    const options = {
        title : req.body.title,
        priceMin: req.body.priceMin,
        priceMax: req.body.priceMax
    }

    Object.keys(options).forEach(key => {
        if (!options[key]) {
            delete options[key]
        }
    });

    try {
        let announcements = await AnnouncementServices.announcementSearch();
        res.status(200).json(announcements);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

const getAnnouncementsCount = async (req,res) => {
    try {
        let announcementsCount = await AnnouncementServices.getCount();
        res.status(200).json({announcementsCount : announcementsCount._count.announcement_id});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

const updateAnnouncement = async (req,res) => {
    const announcement_id = parseInt(req.params.idAnnouncement);
    const options = {
        title: req.body.title,
        description: req.body.description,
        price: parseInt(req.body.price),
    }

    Object.keys(options).forEach(key => {
        if (!options[key]) {
            delete options[key]
        }
    });

    try {
        if (Object.keys(options).length !== 0) {
            await AnnouncementServices.updateA(announcement_id, options);
            res.status(200).json({message: "Announcement updated successfully!"});
        }else {
            res.status(200).json({error: "please enter something to change"});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const deleteAnnouncement = async (req,res) => {
    const announcement_id = parseInt(req.params.idAnnouncement);
    try {
        await AnnouncementServices.deleteA(announcement_id);
        res.status(200).json({message: "Announcement deleted successfully!"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    createAnnouncement,
    getAnnouncements,
    orderAnnouncement,
    searchForAnnouncements,
    getAnnouncementsCount,
    updateAnnouncement,
    deleteAnnouncement
}