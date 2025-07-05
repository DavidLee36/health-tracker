import React, { useState, useEffect } from "react";

const AddFoodPopup = ({ foodItem, handleClose, addToLog }) => {
	const [modalFormData, setModalFormData] = useState({
		name: foodItem.name,
		servings: 1,
		time: "Breakfast"
	});

	useEffect(() => {
		setModalFormData({
			name: foodItem.name,
			servings: 1,
			time: "Breakfast"
		})
	}, [foodItem])

	const handleFormChange = (e) => {
		if(e.target.name === "servings") { // Ensure serving count is always 1 or greater
			if(e.target.value < 0) {
				e.target.value = 1;
			}
		}
		setModalFormData({
			...modalFormData,
			[e.target.name]: e.target.value,
		});
		console.log(e.target.value)
	}

	const handleSubmit = (e) => {
		addToLog(e, {
			...modalFormData,
			calories: foodItem.calories * modalFormData.servings
		});
	}

	return (
		<div className="modal-container">
			<div className="modal">
				<button className="close-modal" onClick={handleClose}>X</button>
				<div className="main-modal-content">
					<h1 className="modal-header">Add Food</h1>
					<h2 className="food-modal-food">
						{foodItem.name} - {foodItem.calories * modalFormData.servings}
					</h2>
					<form onSubmit={handleSubmit} className="modal-form">
						<div className="modal-form-group">
							<label htmlFor="servings">Servings</label>
							<input
								type="number"
								name="servings"
								step="any"
								value={modalFormData.servings}
								required
								onChange={handleFormChange}
							/>
						</div>
						<div className="modal-form-group">
							<label htmlFor="time">Time</label>
							<select name="time" id="time" onChange={handleFormChange}>
								<option value="Breakfast">Breakfast</option>
								<option value="Lunch">Lunch</option>
								<option value="Dinner">Dinner</option>
								<option value="Snack">Snack</option>
							</select>
						</div>
						<button type="submit">Add</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddFoodPopup;
