const express = require("express");
const router = express.Router();

const {MealsController} = require("../controllers");
const {JoiValidations} = require('../middlewares')

router
    .route("/search")
    .post(MealsController.searchForMeals);

router
    .route("/")
    .get(MealsController.getMeals)
    .post(JoiValidations.validateMeal ,MealsController.createMeal);

router
    .route("/:idMeal/order")
    .post(MealsController.orderMeal);

router
    .route("/count")
    .get(MealsController.getMealsCount);

router
    .route("/recommended")
    .get(MealsController.getRecommendedMeals);

router 
    .route("/:idMeal")
    .put(MealsController.updateMeal)
    .delete(MealsController.deleteMeal);

module.exports = router;