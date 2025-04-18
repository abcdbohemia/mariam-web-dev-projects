import  React, { useState, useEffect } from 'react';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] =useState=(null);
 
  useEffect(() => {
  import('./data/recipes.json').then(data => {
    setRecipes(data.default);
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
  const selectedRecipe = recipes.find(recipe => 
    recipe.id === selectedRecipeId);

  return (
    <div className="app">
      <h1> My Recipe App</h1>
      <RecipeList recipes={recipes} onRecipeClick={handleRecipeClick} />
      {selectedRecipe && <RecipeDetails recipe={selectedRecipe} onClose={handleCloseDetails} />}
    </div>
  );
}

export default App;
