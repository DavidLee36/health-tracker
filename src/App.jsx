import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FoodsPage from "./pages/FoodsPage";
import RecipesPage from "./pages/RecipesPage";
import MealsPage from "./pages/MealsPage";
import SettingsPage from "./pages/SettingsPage";
import "./app.css";

function App() {
	return (
		<div className="site-wrapper">
			<Router>
				<nav>
					<Link to="/">Home</Link> |{" "}
					<Link to="/foods">Foods</Link> |{" "}
					<Link to="/recipes">Recipes</Link> |{" "}
					<Link to="/meals">Meals</Link> |{" "}
					<Link to="/settings">Settings</Link>
				</nav>

				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/foods" element={<FoodsPage />} />
					<Route path="/recipes" element={<RecipesPage />} />
					<Route path="/meals" element={<MealsPage />} />
					<Route path="/settings" element={<SettingsPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;