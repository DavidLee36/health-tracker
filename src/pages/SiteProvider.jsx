import { createContext, useContext, useState, useEffect } from "react";
import { getFoodsCached, saveFoods } from "../data/dataService";

const SiteContext = createContext();
export const useSite = () => useContext(SiteContext);

export const SiteProvider = ({ children }) => {
	const [foods, setFoods] = useState([]);
	const [expenses, setExpenses] = useState([]);
	const [aquariumState, setAquariumState] = useState({}); // light status, etc.

	useEffect(() => {
		(async () => {
			const f = await getFoodsCached();
			setFoods(f);
			// Load other app data here as needed
		})();
	}, []);

	const updateFoods = async (newFoods) => {
		setFoods(newFoods);
		await saveFoods(newFoods);
	};

	return (
		<SiteContext.Provider
			value={{
				foods,
				setFoods: updateFoods,
				expenses,
				setExpenses,
				aquariumState,
				setAquariumState,
			}}>
			{children}
		</SiteContext.Provider>
	);
};
