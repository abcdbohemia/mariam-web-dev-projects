import React from 'react';
import './RecipeDetailsModal.css';

function RecipeDetailsModal ({recipe, onClose}) {
    if(!recipe) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content onClick={(e) => e.stopPropagation()}">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>{recipe.title}</h2>
                {recipe.image && <img src={recipe.image} alt={recipe.title} />}
                <h3>ingredients:</h3>
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
        </div>
    );
}

export default RecipeDetailsModal;