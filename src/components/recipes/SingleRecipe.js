import React, { useState, useEffect } from 'react'

//  TODO- check if it's correct (to many api calls in a day)
//  TODO- render result


// const query = "https://api.spoonacular.com/recipes/{id}/information";
const qprefix = "https://api.spoonacular.com/recipes/";

function SingleRecipe({ id }) {
    const [recifeInfo, setRecifeInfo] = useState(null);

    const query = qprefix + id.toString() + "/information?apiKey=6eef74cb8a6d4fc8afd1d4010381f7b2";
    console.log(query);

    useEffect(function effectFunction() {
        async function fetchRecipe() {
            fetch(query)
                .then(response => response.json())
                .then(data => setRecifeInfo(data));
        }
        fetchRecipe();
    }, []);

    console.log(recifeInfo);

    const RenderRecipeInfo = () => {

    }

    return (
        <div>SingleRecipe - {id}</div>
    )
}

export default SingleRecipe;