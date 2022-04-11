const {MealServices} = require('../services')

const createMeal = async (req,res) => {
    try {
        await MealServices.create(req.value);
        res.status(200).json({meassage: "Meal created successfully!"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getMeals = async (req,res) => {
    try {
        let meals = await MealServices.getAll();
        res.status(200).json(meals);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const orderMeal = async (req,res) => {}

const searchForMeals = async(req,res) => {
    const options = {
        title : req.body.title,
        type: req.body.type,
        priceMin: req.body.priceMin,
        priceMax: req.body.priceMax
    }

    Object.keys(options).forEach(key => {
        if (!options[key]) {
            delete options[key]
        }
    });
    
    try {
        let meals = await MealServices.mealSearch(options);
        res.status(200).json(meals);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getRecommendedMeals = (req,res) => {}

const getMealsCount = async(req,res) => {
    try {
        let mealsCount = await MealServices.getCount();
        res.status(200).json({mealsCount: mealsCount._count.meal_id});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const updateMeal = async (req,res) => {
    const mealId = parseInt(req.params.idMeal);
    const options = {
        title: req.body.title,
        description: req.body.description,
        price: parseInt(req.body.price),
        type: req.body.type
    }

    Object.keys(options).forEach(key => {
        if (!options[key]) {
            delete options[key]
        }
    });

    try {
        if (Object.keys(options).length !== 0) {
            await MealServices.updateM(mealId, options);
            res.status(200).json({message: "Meal updated successfully!"});
        }else {
            res.status(200).json({error: "please enter something to change"});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const deleteMeal = async (req,res) => {
    const mealId = parseInt(req.params.idMeal);
    try {
        await MealServices.deleteM(mealId);
        res.status(200).json({message: "Meal deleted successfully!"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    createMeal,
    getMeals,
    orderMeal,
    searchForMeals,
    getRecommendedMeals,
    getMealsCount,
    updateMeal,
    deleteMeal
}