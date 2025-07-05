import React from "react";
import { useNavigate } from 'react-router-dom';

const FoodItem = ({ food, component, amount=1, allowNavigate = true }) => {
	const navigate = useNavigate();

	const handleClick = (e) => {
		e.stopPropagation();
		if (allowNavigate) navigate(`/foods?id=${food.id}`);
	}

	return (
		<div className={`food-grid-item-wrapper grid-item-wrapper ${component ? 'component' : ''}`} onClick={handleClick}>
			<p className="grid-item-text">
				<strong>{food.name}{amount > 1 && ` x${amount}`}</strong> <br/>Calories: {food.calories * amount}
			</p>
		</div>
	);
};

export default FoodItem;
