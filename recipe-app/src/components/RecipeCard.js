import React from 'react';
import './RecipeCard.css'; //we'll write this later

function RecipeCard({recipe, onRecipeClick}){
return(
    <div className="recipe-card" onClick={() =>
        onRecipeClick(recipe.id)}>
        <h3>{recipe.title}</h3>
        <img src={recipe.image} alt={recipe.title} />
        <h4>Ingredients:</h4>
        <ul>
            {recipe.ingredients && recipe.ingredients.slice(0,3).map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
            ))}
            {recipe.ingredients && recipe.ingredients.length > 3 && (
                <li>...and more</li>
            )}
        </ul>
        {/*We arent displaying the instructions here for now*/}
        </div>
)
} 

export default RecipeCard;