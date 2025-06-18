import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FoodItem from "./FoodItem.jsx";
import RecipeItem from "./RecipeItem.jsx";

import foods from "../mock/foods.json";
import recipes from "../mock/recipes.json";

const MealItem = ({ meal, component }) => {
	const navigate = useNavigate();
	const [calories, setCalories] = useState(0);
	const [expanded, setExpanded] = useState(false);

	useEffect(() => {
		calculateMealCalories();
	}, []);

	const handleClick = (e) => {
		navigate(`/meals?id=${meal.id}`)
	}

	const calculateMealCalories = () => {
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
					},
					0
				);

				return sum + recipeTotal * component.quantity;
			} else {
				const food = foods.find((f) => f.id === component.componentID);
				if (food) {
					return sum + food.calories * component.quantity;
				}
				return sum;
			}
		}, 0);

		setCalories(total);
	};

	return (
		<div
			className={`meal-grid-item-wrapper grid-item-wrapper ${
				component ? "component" : ""
			}`} onClick={handleClick}>
			<p className="grid-item-text">
				<strong>{meal.name}</strong> <br />
				Calories: {calories}
			</p>
			<div
				className="expand-grid-item"
				onClick={(e) => {
					e.stopPropagation();
					setExpanded((prev) => !prev)
					}}>
				{expanded ? "△" : "▽"}
			</div>
			{expanded && (
				<div className="expanded-items">
					{meal.components.map((element, index) => {
						if (element.type === "recipe") {
							return (
								<RecipeItem
									key={index}
									recipe={recipes.find(
										(r) => r.id === element.componentID
									)}
									component={true}
									amount={element.quantity}
								/>
							);
						} else {
							return (
								<FoodItem
									key={index}
									food={foods.find(
										(f) => f.id === element.componentID
									)}
									component={true}
									amount={element.quantity}
								/>
							);
						}
					})}
				</div>
			)}
		</div>
	);
};

export default MealItem;
