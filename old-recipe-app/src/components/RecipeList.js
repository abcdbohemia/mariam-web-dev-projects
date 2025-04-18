import React from 'react';
import RecipeCard from './RecipeCard';
import './RecipeList.css'; // well create this later

function RecipeList({ recipes, onRecipeClick }) {
    return(
        <div className="recipe-list">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} onRecipeClick={onRecipeClick} />
            ))}
        </div>
    );
} 

export default RecipeList;