import React from 'react';
import './RecipeDetails.css'; //well create this next

function RecipeDetails({ recipe, onClose }) {
    if (!recipe) {
        return <p>No recipe selected</p>
    }

    return (
        <div className="recipe-details">
            <button className="close-button" onClick={onClose}>Close</button>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
            <h3>Ingredients:</h3>
            <ul>
                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3>Instructions:</h3>
            <ol>
                {recipe.instructions && recipe.instructions.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
            </ol>
        </div>
    )
}

export default RecipeDetails;