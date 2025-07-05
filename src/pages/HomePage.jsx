import React, { useState, useEffect } from "react";
import FoodItemsPresenter from "../components/FoodDataPresenter";
import AddFoodPopup from "../components/AddFoodPopup";
import { useSite } from "./SiteProvider";

const HomePage = () => {
	const { foodLog, updateFoodLog } = useSite();
	const [modalActive, setModalActive] = useState(false);
	const [selectedFood, setSelectedFood] = useState(null);
	const [formData, setFormData] = useState({
		name: "",
		calories: "",
		servings: "",
		time: "Breakfast",
	});

	const today = new Date().toLocaleDateString();
	const todaysLog = foodLog?.[today] || {};
	const allEntries = Object.values(todaysLog).flat();
	const totalCalories = allEntries.reduce(
		(sum, item) => sum + (item.calories || 0),
		0
	);
	const remainingCalories = Math.max(0, 2100 - totalCalories);

	const addToLog = (e, data = null) => {
		if (!data) {
			data = formData;
		}
		const date = new Date().toLocaleDateString();
		const calorieNumber = Number(data.calories);
		const servingNumber = Number(data.servings);
		const dataToSend = {
			...data,
			date: date,
			calories: calorieNumber,
			servings: servingNumber,
		};
		updateFoodLog(dataToSend);
	};

	const handleFoodClick = (food) => {
		console.log("hello from home", food);
		setModalActive(true);
		setSelectedFood(food);
	};

	const handleCloseModal = () => {
		setModalActive(false);
	};

	return (
		<div className="food-dashboard-wrapper">
			{modalActive && (
				<AddFoodPopup
					foodItem={selectedFood}
					handleClose={handleCloseModal}
					addToLog={addToLog}
				/>
			)}
			<div className="calorie-graph dashboard-child">
				<h2>Calorie Summary</h2>
				<p>Total Eaten: {totalCalories} cal</p>
				<p>Remaining: {remainingCalories} cal</p>
			</div>
			<div className="today-log dashboard-child">
				<h2>Today's Log</h2>
				<div className="scrollable-content">
					{["Breakfast", "Lunch", "Dinner", "Snack"].map((time) => {
						const today = new Date().toLocaleDateString();
						const entries = foodLog?.[today]?.[time] || [];

						if (entries.length === 0) return null;

						const totalCalories = entries.reduce(
							(sum, item) => sum + (item.calories || 0),
							0
						);

						return (
							<div key={time} className="log-section">
								<h3>
									{time} – {totalCalories} cal
								</h3>
								<table className="log-table">
									<thead>
										<tr>
											<th>Name</th>
											<th>Calories</th>
											<th>Servings</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{entries.map((entry, index) => (
											<tr key={index}>
												<td>{entry.name}</td>
												<td>{entry.calories} cal</td>
												<td>{entry.servings}</td>
												<td>
													<button
														onClick={() =>
															removeFromLog(
																today,
																time,
																index
															)
														}>
														X
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						);
					})}
				</div>
			</div>
			<div className="quick-add dashboard-child">
				<h2>Quick Add</h2>
				<form onSubmit={addToLog} className="quick-add-form">
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							name="name"
							id="quick-name"
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="calories">Calories</label>
						<input
							type="number"
							name="calories"
							id="quick-calories"
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="servings">Servings</label>
						<input
							type="number"
							name="servings"
							id="quick-servings"
							step="any"
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="time">Time</label>
						<select name="time" id="quick-time">
							<option value="breakfast">Breakfast</option>
							<option value="lunch">Lunch</option>
							<option value="dinner">Dinner</option>
							<option value="snack">Snack</option>
						</select>
					</div>
					<button type="submit">Add</button>
				</form>
			</div>
			<div className="add-from-list dashboard-child">
				<h2>Add Food</h2>
				<FoodItemsPresenter
					showFoods={true}
					showMeals={true}
					showRecipes={true}
					allowNavigate={false}
					parentClick={handleFoodClick}
				/>
			</div>
		</div>
	);
};

export default HomePage;
