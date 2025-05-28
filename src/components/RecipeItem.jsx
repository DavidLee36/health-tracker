import React, { useState, useEffect } from "react";
import FoodItem from "./FoodItem.jsx";

import foods from "../mock/foods.json";

const RecipeItem = ({ recipe, component, amount=1 }) => {
	const [calories, setCalories] = useState(0);
	const [expanded, setExpanded] = useState(false);

	useEffect(() => {
		const total = recipe.components.reduce((sum, component) => {
			const food = foods.find((f) => f.id === component.componentID);
			if (food) {
				return sum + food.calories * component.quantity;
			}
			return sum;
		}, 0);
		setCalories(total);
	}, []);

	return (
		<div className={`recipe-grid-item-wrapper grid-item-wrapper ${component ? 'component' : ''}`}>
			<p className="grid-item-text">
				<strong>{recipe.name}{amount > 1 && ` x${amount}`}</strong> <br />
				Calories: {calories * amount}
			</p>
			<div
				className="expand-grid-item"
				onClick={() => setExpanded((prev) => !prev)}>
				{expanded ? "△" : "▽"}
			</div>
			{expanded && (
				<div className="expanded-items">
					{recipe.components.map((element, index) => (
						<FoodItem
							key={index}
							food={foods.find(
								(f) => f.id === element.componentID
							)}
							component={true}
							amount={element.quantity}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default RecipeItem;
