import React, { useState, useEffect } from "react";
import FoodItem from "./FoodItem";
import RecipeItem from "./RecipeItem";
import MealItem from "./MealItem";

import { useSite } from "../pages/SiteProvider";

const FoodItemsPresenter = ({
	showFoods = false,
	showRecipes = false,
	showMeals = false,
	allowNavigate = true
}) => {
	const { foods } = useSite();
	const [searchTerm, setSearchTerm] = useState("");
	const [itemsToDisplay, setItemsToDisplay] = useState([]);

	useEffect(() => {
		console.log("foodsssss ", foods)
		const foodList = [
			...(showFoods ? foods.filter((item) => item.type === "food") : []),
			...(showRecipes ? foods.filter((item) => item.type === "recipe") : []),
			...(showMeals ? foods.filter((item) => item.type === "meal") : []),
		];
		const filteredList = foodList.filter((item) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setItemsToDisplay(filteredList);
	}, [searchTerm, foods]);

	const searchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	return (
		<div className="content-presenter-wrapper">
			<div className="search-bar-wrapper">
				<input
					type="text"
					className="search-bar"
					placeholder="Search..."
					onChange={searchChange}
				/>
			</div>
			<div className="food-grid-container">
				<div className="food-grid">
					{itemsToDisplay.map((item, index) => {
						if (item.type === "meal") {
							return <MealItem key={index} meal={item} allowNavigate={allowNavigate}/>;
						} else if (item.type === "recipe") {
							return <RecipeItem key={index} recipe={item} allowNavigate={allowNavigate}/>;
						} else if (item.type === "food") {
							return <FoodItem key={index} food={item} allowNavigate={allowNavigate}/>;
						}
						return null;
					})}
				</div>
			</div>
		</div>
	);
};

export default FoodItemsPresenter;
