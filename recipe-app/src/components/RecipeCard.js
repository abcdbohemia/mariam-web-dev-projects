import React from 'react';
import './RecipeCard.css'; 

function RecipeCard({recipe, onClick}){
return(
    <div className="recipe-card" onClick={() =>
        onClick(recipe.id)} style={{cursor: 'pointer'}}>
        <h3>{recipe.title}</h3>
        {recipe.image && <img src={recipe.image} alt={recipe.title} />}
        <h4>Ingredients:</h4>
        <ul>
            {recipe.ingredients && recipe.ingredients.slice(0,3).map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
            ))}
            {recipe.ingredients && recipe.ingredients.length > 3 && (
                <li>...and more</li>
            )}
        </ul>
        </div>
)
} 

export default RecipeCard;