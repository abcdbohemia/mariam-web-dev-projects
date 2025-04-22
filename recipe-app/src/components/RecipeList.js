import React from 'react';
import RecipeCard from './RecipeCard';
import './RecipeList.css';

function RecipeList({ recipes, onRecipeClick}) {
    return(
        <div className="recipe-list">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} onClick={() =>
                onRecipeClick(recipe.id)} /> //pass the recipe ID
            ))}
        </div>
    );
} 

export default RecipeList;