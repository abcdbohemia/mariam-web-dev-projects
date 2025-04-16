import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchTerm) => 
    {
      const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (recipe.ingredients && recipe.ingredients.some(ingredients =>
        ingredients.toLowerCase().includes(searchTerm.toLowerCase())
      ))
      );

    setSearchResults(filteredRecipes);
  };

useEffect(() => {
  //replace this with your actual data fatching logic later
  const initialRecipes = [
  { id: 1, title: "Spaghetti Carbonara", description: "Classic Italian pasta dish.", ingredients:
    ["spaghetti", "eggs", "pancetta", "parmesan"], image: "/images/spaghetti.jpg" },
  { id: 2, title: "Caprese Salad", description: "Simple and refreshing salad.", ingredients: 
    ["tomatoes", "mozzarella", "basil"], image: "/images/salad.jpg" },
  { id: 3, title: "Chicken Stir-fry with Vegetables", description: "Quick and easy Asian-inspired dish.", ingredients:
    ["chicken", "broccoli", "carrots", "soy sauce"], image: "/images/stir-fry.jpg" },
  {id: 4, title: "Blueberry pancakes", description: "Fluffy pancakes with fresh blueberries.", ingredients: 
    ["flour", "milk", "eggs", "blueberries"], image: "/images/pancake.jpg" },
  { id: 5, title: "Tomato Soup", description: "Comforting and versatile soup.", ingredients: 
    ["tomatoes", "vegetable broth", "onion", "garlic"], image: "/images/tomato-soup.jpg" },
  ];
  setRecipes(initialRecipes);
  setSearchResults(initialRecipes); //initially show all recipes
}, []);

  return (
    <div className="app">
      <header className="App-header">
        <h1>My Delicious Recipe App</h1>
      <SearchBar onSearch={handleSearch} />
      <RecipeList recipes={searchResults} />
      </header>
    </div>
  );
}

export default App;
