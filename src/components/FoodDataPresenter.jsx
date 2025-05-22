import React, { useState, useEffect } from "react";
import FoodItem from "./FoodItem";
import RecipeItem from "./RecipeItem";
import MealItem from "./MealItem";

import foods from "../mock/foods.json";
import recipes from "../mock/recipes.json";
import meals from "../mock/meals.json";

const FoodItemsPresenter = ({
	showFoods = false,
	showRecipes = false,
	showMeals = false,
}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [itemsToDisplay, setItemsToDisplay] = useState([]);

	useEffect(() => {
		const foodList = [
			...(showFoods ? foods : []),
			...(showRecipes ? recipes : []),
			...(showMeals ? meals : []),
		];
		const filteredList = foodList.filter((item) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setItemsToDisplay(filteredList);
	}, [searchTerm]);

	const searchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	return (
		<div className="content-presenter-wrapper">
			<div className="search-bar-wrapper">
				<input
					type="text"
					className="search-bar"
					placeholder="Search"
					onChange={searchChange}
				/>
			</div>
			<div className="food-grid-container">
				<div className="food-grid">
					{itemsToDisplay.map((item, index) => {
						if (item.type === "food") {
							return <FoodItem key={index} food={item} />;
						} else if (item.type === "recipe") {
							return <RecipeItem key={index} recipe={item} />;
						} else if (item.type === "meal") {
							return <MealItem key={index} meal={item} />;
						}
						return null;
					})}
				</div>
			</div>
		</div>
	);
};

export default FoodItemsPresenter;
