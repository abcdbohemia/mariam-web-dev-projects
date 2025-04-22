import React, { useState, useEffect } from 'react';
import RecipeList from './components/RecipeList';
import SearchBar from './components/SearchBar';
import RecipeDetailsModal from './components/RecipeDetailsModal';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  useEffect(() => {
    import('./data/recipes.json').then((data) => {
      setRecipes(data.default);
      setFilteredRecipes(data.default); //initialize filtered recipes with all recipes
    }).catch((error) => {
    console.error('Error loading recipes:', error);
    });
  }, []);// empty dependency array to run only once after initial load

  useEffect(() => {  
    const handleSearch = (term) => {
      setSearchTerm(term);
      if (term) {
        const filtered = recipes.filter(recipe =>
          recipe.title.toLowerCase().includes(term.toLowerCase()) || 
          recipe.ingredients.some(ingredient =>
            ingredient.toLowerCase().includes(term.toLowerCase())
          )
        );
      setFilteredRecipes(filtered);
      } else {
      setFilteredRecipes(recipes);
      }
    };
    handleSearch(searchTerm); // function call  on SearchTerm change 
  }, [searchTerm, recipes]);

  const handleRecipeClick = (id) => { 
    setSelectedRecipeId(id);
    setIsModalOpen(true); //open the modal when a recipe is clicked
  };

  const handleCloseModal = () => {
    setSelectedRecipeId(null);
    setIsModalOpen(false); //close the modal
  }; 

  const selectedRecipe = recipes.find((recipe) => recipe.id === selectedRecipeId);
    //this is a variable not a funtion
  
  return (
    <div className="app">
      <h1> My Recipe App</h1>
      <SearchBar onSearch={setSearchTerm} />
      <RecipeList recipes={filteredRecipes} onRecipeClick={handleRecipeClick} />
      { isModalOpen && selectedRecipe && ( 
        <RecipeDetailsModal recipe={selectedRecipe} onClose={handleCloseModal} />
      )}
    </div>
    );
}

export default App;
