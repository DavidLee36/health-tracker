import React from "react";

const FoodItem = ({ food }) => {
	return (
		<div className="food-grid-item-wrapper grid-item-wrapper">
			<p className="grid-item">
				<strong>{food.name}</strong> <br/>Calories: {food.calories}
			</p>
		</div>
	);
};

export default FoodItem;
