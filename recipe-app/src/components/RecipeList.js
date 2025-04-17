import React from "react";
import RecipeCard from './RecipeCard';
import './RecipeList.css';

function RecipeList({ recipes, onRecipeSelect }) {
    return (
        <div className="recipe-list">
            {recipes.length > 0 ? (
            recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} onViewDetails={onRecipeSelect} />
            ))
             ) : ( <p>No recipes found.</p>)
            }
        </div>
    );
}

 export default RecipeList;