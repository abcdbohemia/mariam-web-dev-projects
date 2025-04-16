import React from "react";
import './RecipeCard.css';

function RecipeCard({recipe}) {
    return (
        <div className="recipe-card">
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
        </div>
    );
}

export default RecipeCard;