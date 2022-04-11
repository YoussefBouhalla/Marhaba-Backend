const {JoiUtils} = require('../utils')


const validateUser = async (req, res, next) => {
    
        const validation = await JoiUtils.UserSchema.validate(
           { user_name: req.body.username, 
            first_name: req.body.firstName, 
            last_name: req.body.lastName, 
            password: req.body.password, 
            repeat_password: req.body.repeatPassword, 
            email: req.body.email, 
            phone_number: req.body.phoneNumber, 
            role: req.body.role, 
            image: req.body.image , 
            address: req.body.address}
            )

        if (validation.error) throw res.status(401).json({path: validation.error.details[0].path[0] , details: validation.error.details[0].message})

        await delete validation.value.repeat_password;
        req.value = await {...validation.value , phone_number: validation.value.phone_number.toString()}
        next()
}

const validateMeal = async (req, res, next) => {
    
    const validation = await JoiUtils.MealSchema.validate(
        {
            title: req.body.title, 
            description: req.body.description, 
            price: parseInt(req.body.price), 
            type: req.body.type
        }
    )

    if (validation.error) throw res.status(401).json({path: validation.error.details[0].path[0] , details: validation.error.details[0].message})

    req.value = await validation.value;
    next()
}

const validateAnnouncement = async (req, res, next) => {
    
    let meals_connections;
    
    if(req.body.meals) {
        meals_connections = []
        req.body.meals.forEach(meal_id => {
            meals_connections.push({meals: {connect: {meal_id: parseInt(meal_id)}}})
        });
    }

    const validation = await JoiUtils.AnnouncementSchema.validate(
        {
            title: req.body.title, 
            description: req.body.description, 
            price: parseInt(req.body.price), 
        }
    )

    if (validation.error || !meals_connections) throw res.status(401).json({
        validation_error : meals_connections ? {
                path: validation.error.details[0].path[0] , 
                details: validation.error.details[0].message
            } 
            : false,
        meals_connections_error : !meals_connections ? {error: "you should enter at least a meal"}: false
    })

    let values = await{ ...validation.value , announcement_meal: {create: meals_connections}};

    req.value = await values;
    next()
}

module.exports = {
    validateUser,
    validateMeal,
    validateAnnouncement
}
