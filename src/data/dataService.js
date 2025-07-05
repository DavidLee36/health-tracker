const FOODS_KEY = "foods";

const SERVER_IP = "http://192.168.1.79:5000";

const getData = async(endpoint) => {
	try {
		const response = await fetch(`${SERVER_IP}/api/${endpoint}`, {
			method: "GET"
		});

		if (!response.ok) {
			throw new Error("Failed to fetch data");
		}
		const data = await response.json();
		console.log("data ", data);
		return data;
	} catch (error) {
		console.error("error in getData: ", error);
		return [];
	}
}

const getDataCached = async (bypass = false, cacheKey, endpoint) => {
	const cached = localStorage.getItem(cacheKey);

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
	const data = await getData(endpoint);
	localStorage.setItem(cacheKey, JSON.stringify(data));
	return data;
};

// Load from localStorage if available, else fetch from API and cache it
export const getFoodsCached = async (bypass = false) => {
	return getDataCached(bypass, "foods", "caltracker/get-foods");
};

export const getFoodLogCached = async (bypass = false) => {
	return getDataCached(bypass, "foodLogs", "caltracker/get-food-log");
}

// Send updated data to the API then re-fetch
export const updateFoods = async (formData) => {
	await fetch(`${SERVER_IP}/api/caltracker/update-foods`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(formData),
	});
	clearFoodsCache(); // ensure future calls pull fresh data
};

export const updateFoodLog = async (formData) => {
	console.log("from data service: ", formData);
	await fetch(`${SERVER_IP}/api/caltracker/update-log`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(formData),
	});
}

// Optional: manually clear the cache
export const clearFoodsCache = () => {
	localStorage.removeItem(FOODS_KEY);
};
