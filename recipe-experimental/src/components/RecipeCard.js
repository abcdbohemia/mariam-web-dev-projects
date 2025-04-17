import React from "react";
import './RecipeCard.css';

function RecipeCard({recipe, onViewDetails}) {
    const handleViewDetailsClick = () => {
        onViewDetails(recipe.id); //Call the function prop and pass the recipe ID
};

    return (
        <div className="recipe-card" onClick={handleViewDetailsClick} style={{cursor: 'pointer'}}>
            {recipe.image && <img src = {recipe.image} alt={recipe.title} className="recipe-image" />}
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            {recipe.ingredients && (
                <div className="recipe-ingredients">
                    <strong>Ingredients:</strong>
                    <ul>
                        {recipe.ingredients.slice(0,3).map((ingredient, index) => (
                         <li key={index}> {ingredient} </li>
                                 ))}
                    </ul>
                        {recipe.ingredients.length > 3 && <li>...and more</li>}
                </div>
            )}
        </div>
    );
}

export default RecipeCard;