import React from "react";
import './RecipeCard.css';

function RecipeCard({recipe}) {
    const handleViewDetailsClick = () => 
{
//We need to communicate thei recipe to the app component 
console.log (`View details clicked for: ${recipe.title}`);
//For now, lets just log the title when clicked
//In the next steps we'll pass a function down from App to handle this.
};

    return (
        <div className="recipe-card" onClick={handleViewDetailsClick} style={{cursor: 'pointer'}}>
            {recipe.image && <img src = {recipe.image} alt={recipe.title} className="recipe-image" />}
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            {recipe.ingredients && (
                <div className="ingredients">
                    <strong>Ingredients:</strong>
                    <ul>
                        {recipe.ingredients.slice(0,3).map((ingredient, index) => (
                         <li key={index}> {ingredient} </li>
                                 ))}
                        {recipe.ingredients.length > 3 && <li>...and more</li>}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default RecipeCard;