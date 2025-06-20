import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FoodItem from "./FoodItem.jsx";
import RecipeItem from "./RecipeItem.jsx";
import { calculateMealCalories } from "../helpers/food-helpers.js"

import foods from "../mock/foods.json";
import recipes from "../mock/recipes.json";

const MealItem = ({ meal, component }) => {
	const navigate = useNavigate();
	const [expanded, setExpanded] = useState(false);

	const calories = calculateMealCalories(meal);

	const handleClick = (e) => {
		navigate(`/meals?id=${meal.id}`)
	}

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
