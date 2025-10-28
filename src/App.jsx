import { useState } from "react";
import "./index.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("ingredient");
  const [darkMode, setDarkMode] = useState(false);

  async function searchRecipes(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    let url = "";
    if (mode === "ingredient") {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;
    } else if (mode === "name") {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    } else if (mode === "cuisine") {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!data.meals) {
        setMeals([]);
        setError("No recipes found. Try different words 🤍");
      } else {
        setMeals(data.meals);
      }
    } catch {
      setError("Network error. Please try again.");
    }

    setLoading(false);
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      {/* Dark Mode Toggle */}
      <button className="toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Blurred Floating Background */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      <h1 className="title typewriter">🍽️ Recipe Ideas Finder</h1>

      <div className="mode-buttons">
        <button
          onClick={() => setMode("ingredient")}
          className={mode === "ingredient" ? "active" : ""}
        >
          Ingredient
        </button>
        <button
          onClick={() => setMode("name")}
          className={mode === "name" ? "active" : ""}
        >
          Name
        </button>
        <button
          onClick={() => setMode("cuisine")}
          className={mode === "cuisine" ? "active" : ""}
        >
          Cuisine
        </button>
      </div>

      <form onSubmit={searchRecipes} className="search-box">
        <input
          type="text"
          placeholder="Search e.g. Potato, Rice, Chicken, Indian…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Search</button>
      </form>

      {loading && <p className="loading">Loading recipes…</p>}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {meals.map((meal, i) => (
          <div
            className="card"
            style={{ animationDelay: `${i * 0.12}s` }}
            key={meal.idMeal}
          >
            <img src={meal.strMealThumb} alt={meal.strMeal} />

            <h3>{meal.strMeal}</h3>

            {/* Hover Overlay */}
            <div className="overlay">
              <a
                href={`https://www.themealdb.com/meal.php?c=${meal.idMeal}`}
                target="_blank"
                rel="noreferrer"
              >
                <button className="view-btn">View Recipe</button>
              </a>
            </div>
          </div>
        ))}
      </div>

      <footer>
        Built by <b>Shishanki Vishwakarma</b> • Candidate ID: <b>Naukri1025</b>
      </footer>
    </div>
  );
}
