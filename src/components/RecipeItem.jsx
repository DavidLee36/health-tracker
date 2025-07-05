import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { calculateRecipeCalories } from "../helpers/foodHelpers.js";
import FoodItem from "./FoodItem.jsx";
import { useSite } from "../pages/SiteProvider.jsx";

const RecipeItem = ({ recipe, component, amount = 1 }) => {
	const { foods } = useSite();
	const navigate = useNavigate();
	const [expanded, setExpanded] = useState(false);
	const [calories, setCalories] = useState(0);

	useEffect(() => {
		const load = async () => {
			setCalories(await calculateRecipeCalories(recipe));
		};
		load();
	}, [recipe.components]);

	const handleClick = (e) => {
		e.stopPropagation();
		navigate(`/recipes?id=${recipe.id}`);
	};

	return (
		<div
			className={`recipe-grid-item-wrapper grid-item-wrapper ${
				component ? "component" : ""
			}`}
			onClick={handleClick}>
			<p className="grid-item-text">
				<strong>
					{recipe.name}
					{amount > 1 && ` x${amount}`}
				</strong>{" "}
				<br />
				Calories: {calories * amount}
			</p>
			<div
				className="expand-grid-item"
				onClick={(e) => {
					e.stopPropagation();
					setExpanded((prev) => !prev);
				}}>
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
