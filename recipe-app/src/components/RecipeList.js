import React from "react";
import RecipeCard from './RecipeCard';
import './RecipeList.css';

function RecipeList({ recipes }) {
    return (
        <div className="recipe-list">
            {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
        {recipes.length === 0 && <p>No recipes found.</p>}
        </div>
    );
}

 export default RecipeList;