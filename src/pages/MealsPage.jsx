import React from "react";
import FoodItemsPresenter from "../components/FoodDataPresenter";

const MealsPage = () => {
	return (
		<div className="page-content-wrapper">
			<h1>Meals</h1>
			<div className="main-food-page-content-wrapper">
				<FoodItemsPresenter showMeals={true} />
				<div className="quick-edit">
					<h3>quick edit</h3>
				</div>
			</div>
			<div className="aed-buttons">
				<button className="add-btn">Add</button>
				<button className="edit-btn btn-not-active">Edit</button>
				<button className="delete-btn">Delete</button>
			</div>
		</div>
	);
};

export default MealsPage;
