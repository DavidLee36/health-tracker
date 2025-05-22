import React, { useState, useEffect } from "react";

import foods from "../mock/foods.json";

const RecipeItem = ({ recipe }) => {
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

	useEffect(() => {
		console.log("toggled");
	}, [expanded])

	return (
		<div className="recipe-grid-item-wrapper grid-item-wrapper">
			<p className="grid-item-text">
				<strong>{recipe.name}</strong> <br />
				Calories: {calories}
			</p>
			<div className="expand-grid-item" onClick={() => setExpanded(prev => !prev)}>
				{expanded ? "△" : "▽"}
			</div>
			{expanded &&
				<div className="expanded-items">
					
				</div>
			}
		</div>
	);
};

export default RecipeItem;
