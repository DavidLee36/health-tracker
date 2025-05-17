import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Foods from "./pages/Foods";
import Recipes from "./pages/Recipes";
import Meals from "./pages/Meals";
import Settings from "./pages/Settings";

function App() {
	return (
		<div className="site-wrapper">
			<Router>
				<nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
					<Link to="/">Home</Link> |{" "}
					<Link to="/foods">Foods</Link> |{" "}
					<Link to="/recipes">Recipes</Link> |{" "}
					<Link to="/meals">Meals</Link> |{" "}
					<Link to="/settings">Settings</Link>
				</nav>

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/foods" element={<Foods />} />
					<Route path="/recipes" element={<Recipes />} />
					<Route path="/meals" element={<Meals />} />
					<Route path="/settings" element={<Settings />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;