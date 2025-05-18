import React from "react";
import Search from "../components/Search";
import FoodItemsPresenter from "../components/FoodDataPresenter";


const FoodsPage = () => {
	return (
		<div className="page-content-wrapper">
			<h1>Foods</h1>
			<div className="main-food-page-content-wrapper">
				<FoodItemsPresenter showFoods={true} />
				<Search></Search>
			</div>
			<div className="aed-buttons">
				<button className="add-btn">Add</button>
				<button className="edit-btn btn-not-active">Edit</button>
				<button className="delete-btn">Delete</button>
			</div>
		</div>
	);
};

export default FoodsPage;
