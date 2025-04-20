import React, { useState, useEffect } from 'react';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
 
  useEffect(() => {
  import('./data/recipes.json').then(data => {
    setRecipes(data.default);
    setFilteredRecipes(data.default); //initialize filtered recipes with all recipes
  })
  .catch(error => {console.error('Error loading recipes:', error);
  });
  }, []);// empty array to indicate to run once after initial load

  //This function is called when RecipeCard is clicked, it taked ID of
  //the clicked recipe and updates the selectedRecipeId state
  const handleRecipeClick = (id) => { 
    setSelectedRecipeId(id);
  };

  const handleCloseDetails = () => {
    setSelectedRecipeId(null); //Reset the selected recipe ID to hide details
  }; 

  //This line finds the full recipe object from the recipes array whose ID matches the 
  // 'selectedRecipeId' in state
  const selectedRecipe = recipes.find((recipe) => 
    recipe.id === selectedRecipeId);

  //Function to handle search term changes from the SearchBar
  const handleSearch =(term) => {
    setSearchTerm(term);
    if (recipes && recipes.length > 0) {
    const filtered= recipes.filter((recipe) => {
      const titleMatch = recipe.title.toLowerCase().includes(term.toLowerCase());
      const ingredientsMatch = recipe.ingredients.some((ingredient) =>
      ingredient.toLowerCase().includes(term.toLowerCase())
      );
      return titleMatch || ingredientsMatch;
    });
   setFilteredRecipes(filtered);  
    } else {setFilteredRecipes([]);
      console.warn("handleSearch called before recipes data was loaded.")
    }
  };

  return (
    <div className="app">
      <h1> My Recipe App</h1>
      <SearchBar onSearch={handleSearch} />
      <RecipeList recipes={filteredRecipes} onRecipeClick={handleRecipeClick} />
      {selectedRecipe && <RecipeDetails recipe={selectedRecipe} onClose={handleCloseDetails} />}
    </div>
  );
}

export default App;
