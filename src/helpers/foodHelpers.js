// Helper functions for the calorie tracker app

import { getFoodsCached } from "../data/dataService";


export const calculateRecipeCalories = async(recipe) => {
	const foods = await getFoodsCached();

	const total = recipe.components.reduce((sum, component) => {
		const food = foods.find((f) => f.id === component.componentID);
		if (food) {
			return sum + food.calories * component.quantity;
		}
		return sum;
	}, 0);
	return total;
}

export const calculateMealCalories = async(meal) => {
	const foods = await getFoodsCached();

	const total = meal.components.reduce((sum, component) => {
		if (component.type === "recipe") {
			const recipe = foods.find(
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