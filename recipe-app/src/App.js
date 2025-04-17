import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import recipesData from './recipesData.js';

  //replace this with your actual data fatching logic later
  

function App() {
  const [recipes, setRecipes] = useState(recipesData);
  const [searchResults, setSearchResults] = useState(recipesData);
  const [searchTerm, setSearchTerm] =useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        const filtered = recipes.filter( recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ingredients =>
        ingredients.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    setSearchResults(filtered);
  };

  const handleRecipeSelect = (recipeId) => {
   const selected = recipes.find(recipe => recipe.id === recipeId);
    setSelectedRecipe(selected);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>My Delicious Recipe App</h1>
      <SearchBar onSearch={handleSearch} />
      </header>
      <main>
      <RecipeList recipes={searchResults} onRecipeSelect={handleRecipeSelect} />
      {selectedRecipe && (
        <div className="recipe-details">
          <h2>{selectedRecipe.title}</h2>
          <img src={selectedRecipe.image} alt={selectedRecipe.title} 
          style={{maxWidth:'200px', height:'auto'}} />
          <p>{selectedRecipe.description}</p>
          <h3>Ingredients:</h3>
          <ul>
            {selectedRecipe.ingredients && selectedRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3>Instructions:</h3>
          <ol>
            {selectedRecipe.instructions && selectedRecipe.instructions.map((
              step, index) => (
                <li key={index}>{step}</li>
            ))}
          </ol>
          {/*you can add more details here later*/} 
        </div>
      )}
      </main>
    </div>
  );
}

export default App;
