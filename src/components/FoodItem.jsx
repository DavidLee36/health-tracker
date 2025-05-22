import React from "react";

const FoodItem = ({ food }) => {
	return (
		<div className="food-list-item list-item-wrapper">
			<p className="list-item">
				<strong>{food.name}</strong> : {food.calories}
			</p>
		</div>
	);
};

export default FoodItem;
