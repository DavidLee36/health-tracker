import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Search from "../components/Search";
import FoodItemsPresenter from "../components/FoodDataPresenter";
import { useSite } from "./SiteProvider";
import { useNavigate } from "react-router-dom";

const FoodsPage = () => {
	const { foods, updateFoods } = useSite();
	const initialForm = {
		id: "",
		name: "",
		calories: "",
	};
	const [formData, setFormData] = useState(initialForm);
	const query = new URLSearchParams(useLocation().search);
	const id = query.get("id");
	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			const found = foods.find((f) => f.id === id);
			if (found) {
				setFormData({
					id: found.id,
					name: found.name,
					calories: found.calories,
				});
			}
		} else {
			setFormData(initialForm);
		}
	}, [id, foods]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		updateFoods({
			...formData,
			type: "food",
		});
	};

	const handleDelete = (e) => {
		e.preventDefault();
		console.log(id);
	};

	const handleClear = (e) => {
		navigate("/foods");
	};

	return (
		<div className="page-content-wrapper">
			<h1>Foods</h1>
			<div className="main-food-page-content-wrapper">
				<div className="fuck-this">
					<FoodItemsPresenter showFoods={true} />
				</div>
				<div className="quick-edit">
					<h2>
						Selected:{" "}
						{id
							? foods.find((f) => f.id === id)?.name || "none"
							: "none"}
					</h2>
					<form className="food-form" onSubmit={handleSubmit}>
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
						<div className="form-btn-grup">
							<button type="submit">Submit</button>
							<button onClick={handleClear}>Clear</button>
							<button onClick={handleDelete}>Delete</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default FoodsPage;
