import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSite } from "./SiteProvider";
import { updateFoods } from "../data/dataService";
import FoodItemsPresenter from "../components/FoodDataPresenter";
import { calculateRecipeCalories } from "../helpers/foodHelpers";

const RecipesPage = () => {
	const { foods } = useSite();
	const query = new URLSearchParams(useLocation().search);
	const id = query.get("id");

	const [formData, setFormData] = useState({
		id: "",
		name: "",
		calories: "",
	});

	useEffect(() => {
		if (id) {
			const found = foods.find((f) => f.id === id);
			if (found) {
				setFormData({
					id: found.id,
					name: found.name,
					calories: calculateRecipeCalories(foods.find((f) => f.id === id)),
				});
			}
		}
	}, [id, foods]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className="page-content-wrapper">
			<h1>Recipes</h1>
			<div className="main-food-page-content-wrapper">
				<FoodItemsPresenter showRecipes={true} />
				<div className="quick-edit">
					<h2>
						Selected:
						{id ? foods.find((f) => f.id === id).name : "none"}
					</h2>
					<form
						className="recipe-form"
						onSubmit={(e) => e.preventDefault()}>
						<div className="form-group">
							<label htmlFor="food-id">ID</label>
							<input
								type="text"
								id="food-id"
								name="id"
								value={formData.id}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="food-name">Name</label>
							<input
								type="text"
								id="food-name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="food-calories">Calories</label>
							<input
								type="number"
								id="food-calories"
								name="calories"
								onChange={handleChange}
								value={formData.calories}
								required
							/>
						</div>
						<button type="submit">Submit</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default RecipesPage;
