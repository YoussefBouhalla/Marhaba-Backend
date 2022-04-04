const {create, getAll, getSingle, getCount, mealSearch} = require('../services/MealServices')

const createMeal = async (req,res) => {
    await create('Keto Cheesy Cabbage Sausage Skillet' , 'desczafozhaufoza', 5 , 'main');
    res.status(200).json({message: 'Meal created!'})
}

const getMeals = async (req,res) => {
    let meals = await getAll('dessert');
    res.status(200).json(meals)
}

const orderMeal = async (req,res) => {
    let meal = await getSingle(parseInt(req.params.idMeal));
    res.status(200).json(meal)
}

const searchForMeals = async(req,res) => {
    let meals = await mealSearch({title: 'c' , type: 'dessert' , priceMin: 1 , priceMax: 4});
    res.status(200).json(meals)
}

const getRecommendedMeals = (req,res) => {}

const getMealsCount = async(req,res) => {
    let mealsCount = await getCount('dessert');
    res.status(200).json(mealsCount)
}

const updateMeal = (req,res) => {}

const deleteMeal = (req,res) => {}

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