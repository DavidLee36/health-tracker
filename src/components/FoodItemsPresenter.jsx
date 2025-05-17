import React, { useState, useEffect } from "react";

import foods from "../mock/foods.json";
import recipes from "../mock/recipes.json";
import meals from "../mock/meals.json"

const FoodItemsPresenter = ({
	showFoods = true,
	showRecipes = false,
	showMeals = false
}) => {
	return (
		<div className="food-list-container">
			{showFoods && (
				<div className="food-list">
					<h3>Foods</h3>
					<ul>
						{foods.map((item, index) => (
							<li key={index}>
								<strong>{item.name}</strong>: {item.calories} cal
							</li>
						))}
					</ul>
				</div>
			)}
			{showRecipes && (
				<div className="food-list">
					<h3>Recipes</h3>
					<ul>
						{foods.map((item, index) => (
							<li key={index}>
								<strong>{item.name}</strong>: {item.calories} cal
							</li>
						))}
					</ul>
				</div>
			)}
			{showMeals && (
				<div className="food-list">
					<h3>Meals</h3>
					<ul>
						{foods.map((item, index) => (
							<li key={index}>
								<strong>{item.name}</strong>: {item.calories} cal
							</li>
						))}
					</ul>
				</div>
			)}
			{showMeals && (
				<div className="food-list">
					<h3>Meals</h3>
					<ul>
						{foods.map((item, index) => (
							<li key={index}>
								<strong>{item.name}</strong>: {item.calories} cal
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default FoodItemsPresenter;
