// Helper functions for the calorie tracker app

import foods from "../mock/foods.json";
import recipes from "../mock/recipes.json";
import meals from "../mock/meals.json";
import { getFoodsCached } from "../data/dataService";


export const calculateRecipeCalories = (recipe) => {
	const total = recipe.components.reduce((sum, component) => {
		const food = foods.find((f) => f.id === component.componentID);
		if (food) {
			return sum + food.calories * component.quantity;
		}
		return sum;
	}, 0);
	return total;
}

export const calculateMealCalories = (meal) => {
	const total = meal.components.reduce((sum, component) => {
		if (component.type === "recipe") {
			const recipe = recipes.find(
				(r) => r.id === component.componentID
			);
			if (!recipe) return sum;

			const recipeTotal = recipe.components.reduce(
				(rSum, rComponent) => {
					const rFood = foods.find(
						(f) => f.id === rComponent.componentID
					);
					if (rFood) {
						return rSum + rFood.calories * rComponent.quantity;
					}
					return rSum;
				}, 0);
			return sum + recipeTotal * component.quantity;
		} else {
			const food = foods.find((f) => f.id === component.componentID);
			if (food) {
				return sum + food.calories * component.quantity;
			}
			return sum;
		}
	}, 0);
	return total;
}