import React from "react";

const FoodItem = ({ food, component, amount=1 }) => {
	return (
		<div className={`food-grid-item-wrapper grid-item-wrapper ${component ? 'component' : ''}`}>
			<p className="grid-item-text">
				<strong>{food.name}{amount > 1 && ` x${amount}`}</strong> <br/>Calories: {food.calories * amount}
			</p>
		</div>
	);
};

export default FoodItem;
