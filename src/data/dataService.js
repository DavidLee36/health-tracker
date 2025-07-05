const FOODS_KEY = "foods";

const SERVER_IP = "http://192.168.1.79:5000";

export const getFoods = async() => {
	try {
		const response = await fetch(`${SERVER_IP}/api/caltracker/get-foods`, {
			method: "GET"
		});

		if (!response.ok) {
			throw new Error("Failed to fetch foods");
		}
		const data = await response.json();
		console.log("data ", data);
		return data;
	} catch (error) {
		console.error("error in getFoods: ", error);
		return [];
	}
}

// Load from localStorage if available, else fetch from API and cache it
export const getFoodsCached = async (bypass = false) => {
	const cached = localStorage.getItem(FOODS_KEY);

	if (cached && !bypass) {
		try {
			const parsed = JSON.parse(cached);
			if (Array.isArray(parsed) && parsed.length > 0) {
				return parsed;
			}
			// If it's an empty array, fall through to fetch new data
		} catch (e) {
			console.warn("Invalid cache, refetching...");
			// Fall through to fetch new data
		}
	}

	// Either there was no cache, it was invalid, or it was empty
	const data = await getFoods();
	localStorage.setItem(FOODS_KEY, JSON.stringify(data));
	return data;
};

// Send updated data to the API then re-fetch
export const updateFoods = async (formData) => {
	await fetch(`${SERVER_IP}/api/caltracker/update-foods`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(formData),
	});
	clearFoodsCache(); // ensure future calls pull fresh data
};

// Optional: manually clear the cache
export const clearFoodsCache = () => {
	localStorage.removeItem(FOODS_KEY);
};
