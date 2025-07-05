import { createContext, useContext, useState, useEffect } from "react";
import { getFoodLogCached, getFoodsCached, updateFoods as updateFoodsOnServer, updateFoodLog as updateFoodLogOnServer } from "../data/dataService";

const SiteContext = createContext();
export const useSite = () => useContext(SiteContext);

export const SiteProvider = ({ children }) => {
	const [foods, setFoods] = useState([]);
	const [foodLog, setFoodLog] = useState([]);
	const [expenses, setExpenses] = useState([]);
	const [aquariumState, setAquariumState] = useState({}); // light status, etc.

	useEffect(() => {
		(async () => {
			const f = await getFoodsCached();
			const l = await getFoodLogCached();
			setFoods(f);
			setFoodLog(l);
			// Load other app data here as needed
		})();
	}, []);

	const updateFoods = async (formData) => {
		await updateFoodsOnServer(formData);
		const latest = await getFoodsCached(true);
		setFoods(latest);
	};

	const updateFoodLog = async (formData) => {
		await updateFoodLogOnServer(formData);
	}

	return (
		<SiteContext.Provider
			value={{
				foods,
				updateFoods: updateFoods,
				foodLog,
				updateFoodLog: updateFoodLog,
				expenses,
				setExpenses,
				aquariumState,
				setAquariumState,
			}}>
			{children}
		</SiteContext.Provider>
	);
};
