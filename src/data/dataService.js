const FOODS_KEY = "foods";

export const getFoods = async() => {
	try {
		const response = await fetch("/api/caltracker/get-foods", {
			method: "POST"
		});

		if (!response.ok) {
			throw new Error("Failed to fetch foods");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("error in getFoods: ", error);
		return [];
	}
}

// Load from localStorage if available, else fetch from API and cache it
export const getFoodsCached = async () => {
	const cached = localStorage.getItem(FOODS_KEY);

	if (cached) {
		try {
			return JSON.parse(cached);
		} catch (e) {
			console.warn("Invalid cache, refetching...");
		}
	}

	const data = await getFoods();
	localStorage.setItem(FOODS_KEY, JSON.stringify(data));
	return data;
};

// Save updated foods to both localStorage and API
export const saveFoods = async (updatedFoods) => {
	localStorage.setItem(FOODS_KEY, JSON.stringify(updatedFoods));

	await fetch("/api/caltracker/update-foods", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(updatedFoods),
	});
};

// Optional: manually clear the cache
export const clearFoodsCache = () => {
	localStorage.removeItem(FOODS_KEY);
};

// Filtered getter (local only)
export const getItemsByType = async (type) => {
	const foods = await getFoodsCached();
	if (!Array.isArray(foods)) return [];
	return foods.filter((item) => item.type === type);
};
