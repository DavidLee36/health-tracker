import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSite } from "./SiteProvider";
import FoodItemsPresenter from "../components/FoodDataPresenter";
import { calculateMealCalories } from "../helpers/foodHelpers";

const MealsPage = () => {
	const { foods, updateFoods } = useSite();
	const [selectedFoods, setSelectedFoods] = useState({});
	const [miniSearch, setMiniSearch] = useState("");
	const query = new URLSearchParams(useLocation().search);
	const id = query.get("id");
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		id: "",
		name: "",
		calories: 0,
	});

	useEffect(() => {
		if (id) {
			const found = foods.find((f) => f.id === id);
			if (found) {
				setFormData({
					id: found.id,
					name: found.name,
				});
				const selected = {};
				if (found.components) {
					console.log(found.components);
					for (const comp of found.components) {
						if (comp.type === "food" || comp.type === "recipe") {
							selected[comp.componentID] = comp.quantity;
						}
					}
				}
				setSelectedFoods(selected);
			}
		} else {
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
		const updateCalories = async () => {
			const mockMeal = {
				components: Object.entries(selectedFoods).map(
					([componentID, quantity]) => {
						const item = foods.find((f) => f.id === componentID);
						return {
							componentID,
							type: item?.type || "food",
							quantity,
						};
					}
				),
			};

			const calories = await calculateMealCalories(mockMeal);
			setFormData((prev) => ({
				...prev,
				calories,
			}));
		};

		updateCalories();
		console.log("selectedfoods: ", selectedFoods)
	}, [selectedFoods, foods]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const componentsArray = Object.entries(selectedFoods).map(
			([componentID, quantity]) => {
				const item = foods.find((f) => f.id === componentID);
				return {
					componentID,
					type: item?.type || "food", // fallback to "food" if not found
					quantity,
				};
			}
		);

		const updatedMeal = {
			id: formData.id,
			name: formData.name,
			type: "meal",
			components: componentsArray,
		};

		updateFoods(updatedMeal);
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
		navigate("/meals");
	};

	return (
		<div className="page-content-wrapper">
			<h1>Meals</h1>
			<div className="main-food-page-content-wrapper">
				<FoodItemsPresenter showMeals={true} />
				<div className="quick-edit">
					<h2>
						Selected:{" "}
						{id
							? foods.find((f) => f.id === id)?.name || "none"
							: "none"}
					</h2>
					<form className="meal-form" onSubmit={handleSubmit}>
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
								readOnly
								value={formData.calories}
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
											(item.type === "food" ||
												item.type === "recipe") &&
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

export default MealsPage;
