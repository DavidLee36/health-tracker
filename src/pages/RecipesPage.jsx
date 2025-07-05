import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSite } from "./SiteProvider";
import FoodItemsPresenter from "../components/FoodDataPresenter";
import { calculateRecipeCalories } from "../helpers/foodHelpers";

const RecipesPage = () => {
	const { foods, updateFoods } = useSite();
	const [selectedFoods, setSelectedFoods] = useState({});
	const [miniSearch, setMiniSearch] = useState("");
	const query = new URLSearchParams(useLocation().search);
	const id = query.get("id");
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		id: "",
		name: "",
		calories: "",
		components: [],
	});

	useEffect(() => {
		if (id) {
			const found = foods.find((f) => f.id === id);
			if (found) {
				setFormData({
					id: found.id,
					name: found.name,
					calories: calculateRecipeCalories(found),
				});

				// Autofill selected ingredients and quantities
				const selected = {};
				if (found.components) {
					for (const comp of found.components) {
						if (comp.type === "food") {
							selected[comp.componentID] = comp.quantity;
						}
					}
				}
				setSelectedFoods(selected);
			}
		} else {
			// Reset to blank if not editing
			setFormData({
				id: "",
				name: "",
				calories: "",
				components: [],
			});
			setSelectedFoods({});
		}
	}, [id, foods]);

	useEffect(() => {
		const total = Object.entries(selectedFoods).reduce((sum, [id, qty]) => {
			const foodItem = foods.find((f) => f.id === id);
			return sum + (foodItem ? foodItem.calories * qty : 0);
		}, 0);
		console.log(total);
		setFormData((prev) => ({
			...prev,
			calories: total,
		}));
	}, [selectedFoods]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const componentsArray = Object.entries(selectedFoods).map(
			([componentID, quantity]) => ({
				componentID,
				type: "food",
				quantity,
			})
		);

		const updatedRecipe = {
			id: formData.id,
			name: formData.name,
			type: "recipe",
			components: componentsArray,
		};

		updateFoods(updatedRecipe);
		console.log("Saved:", updatedRecipe);
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleDelete = (e) => {
		e.preventDefault();
		console.log(id);
	};

	const handleClear = (e) => {
		navigate("/recipes");
	};

	return (
		<div className="page-content-wrapper">
			<h1>Recipes</h1>
			<div className="main-food-page-content-wrapper">
				<div className="fuck-this">
					<FoodItemsPresenter showRecipes={true} />
				</div>
				<div className="quick-edit">
					<h2>
						Selected:{" "}
						{id
							? foods.find((f) => f.id === id)?.name || "none"
							: "none"}
					</h2>
					<form className="recipe-form" onSubmit={handleSubmit}>
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
								value={formData.calories}
								readOnly
							/>
						</div>
						<div className="form-group">
							<label>Ingredients</label>
							<div className="component-list-search">
								<input
									type="text"
									id="ingredient-search"
									value={miniSearch}
									onChange={(e) =>
										setMiniSearch(e.target.value)
									}
									placeholder="Search ingredients..."
									autoComplete="off"
								/>
							</div>
							<div className="component-list-container">
								{foods
									.filter(
										(item) =>
											item.type === "food" &&
											item.name
												.toLowerCase()
												.includes(
													miniSearch.toLowerCase()
												)
									)
									.map((food) => (
										<div key={food.id}>
											<label>
												<input
													type="checkbox"
													checked={
														selectedFoods[
															food.id
														] !== undefined
													}
													onChange={(e) => {
														const updated = {
															...selectedFoods,
														};
														if (e.target.checked) {
															updated[
																food.id
															] = 1;
														} else {
															delete updated[
																food.id
															];
														}
														setSelectedFoods(
															updated
														);
													}}
												/>
												{food.name}
											</label>
											{selectedFoods[food.id] !==
												undefined && (
												<input
													type="number"
													min="1"
													value={
														selectedFoods[food.id]
													}
													onChange={(e) => {
														setSelectedFoods({
															...selectedFoods,
															[food.id]: Number(
																e.target.value
															),
														});
													}}
													style={{
														marginLeft: "8px",
														width: "60px",
													}}
												/>
											)}
										</div>
									))}
							</div>
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

export default RecipesPage;
