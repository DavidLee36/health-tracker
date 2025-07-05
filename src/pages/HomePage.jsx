import React, { useState, useEffect } from "react";
import FoodItemsPresenter from "../components/FoodDataPresenter";

const HomePage = () => {
	const [formData, setFormData] = useState({
		name: "",
		calories: "",
	})

	const quickSubmit = () => {

	}

	return (
		<div className="food-dashboard-wrapper">
			<div className="calorie-graph">

			</div>
			<div className="today-log">

			</div>
			<div className="quick-add">
				<form onSubmit={quickSubmit} className="quick-add-form">
					<div className="form-group">
						<label htmlFor="quick-name">Name</label>
						<input type="text"
							id="quick-name"
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="quick-calories">Calories</label>
						<input type="number"
							id="quick-calories"
							required
						/>
					</div>
					<button type="submit">Add</button>
				</form>
			</div>
			<div className="add-from-list">
				<FoodItemsPresenter showFoods={true} showMeals={true} showRecipes={true} allowNavigate={false} />
			</div>
		</div>
	);
};

export default HomePage;
