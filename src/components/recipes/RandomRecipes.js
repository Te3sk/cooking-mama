import React, { useState, useEffect } from 'react'
import SingleRecipe from './SingleRecipe.js';
import { singleRecipe } from './SingleRecipe.js';

const query = "https://api.spoonacular.com/recipes/random?apiKey=6eef74cb8a6d4fc8afd1d4010381f7b2";

function RandomRecipes() {
    const [recipe, setRecipe] = useState(null);

    console.log(query);

    useEffect(function effectFunction() {
        async function fetchRecipe() {
            fetch(query)
                .then(response => response.json())
                .then(data => setRecipe(data));
        }
        fetchRecipe();
    }, []);

    console.log(recipe);

    return (
        <div>
            <p>Random recipe :</p>
            {recipe ?
                recipe.status == 'failure' ?
                    <p>TOO MANY GET REQUEST TODAY</p> :
                    <div>
                        <SingleRecipe id={recipe.recipes['0'].id} />
                    </div>
                : <p>error</p>}
        </div>
    );

}

export default RandomRecipes