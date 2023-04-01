// # ------------------------------------------------
// # SEARCHING RECIPES PAGE
// # ------------------------------------------------

import { React, useState, useEffect } from "react";

// # Spoonacular API parameters
const scpar = {
  // * general prefix of the api get request
  prefix:
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=6eef74cb8a6d4fc8afd1d4010381f7b2&",
  // * list of the cousines avaible from the api (as string)
  listOfCousine: [
    "african",
    "american",
    "british",
    "cajun",
    "caribbean",
    "chinese",
    "eastern European",
    "european",
    "french",
    "german",
    "greek",
    "indian",
    "irish",
    "italian",
    "japanese",
    "jewish",
    "korean",
    "latin American",
    "mediterranean",
    "mexican",
    "middle Eastern",
    "nordic",
    "southern",
    "spanish",
    "thai",
    "vietnamese",
  ],
  // * list of the diet avaible from the api (as string)
  listOfDiet: [
    "gluten free",
    "ketogenic",
    "vegetarian",
    "lacto-vegetarian",
    "ovo-vegetarian",
    "vegan",
    "pescetarian",
    "paleo",
  ],
  // * list of the intollerance avaible from the api (as string)
  listOfIntollerance: [
    "dairy",
    "egg",
    "gluten",
    "grain",
    "peanut",
    "seafood",
    "sesame",
    "shellfish",
    "soy",
    "sulfite",
    "tree Nut",
    "wheat",
  ],
  // * list of the sort options
  listOfSortOptions: [
    "meta-score",
    "popularity",
    "healthiness",
    "price",
    "time",
    "random",
    "max-used-ingredients",
    "min-missing-ingredients",
    "alcohol",
    "caffeine",
    "copper",
    "energy",
    "calories",
    "calcium",
    "carbohydrates",
    "carbs",
    "choline",
    "cholesterol",
    "total-fat",
    "fluoride",
    "trans-fat",
    "saturated-fat",
    "mono-unsaturated-fat",
    "poly-unsaturated-fat",
    "fiber",
    "folate",
    "folic-acid",
    "iodine",
    "iron",
    "magnesium",
    "manganese",
    "vitamin-b3",
    "niacin",
    "vitamin-b5",
    "pantothenic-acid",
    "phosphorus",
    "potassium",
    "protein",
    "vitamin-b2",
    "riboflavin",
    "selenium",
    "sodium",
    "vitamin-b1",
    "thiamin",
    "vitamin-a",
    "vitamin-b6",
    "vitamin-b12",
    "vitamin-c",
    "vitamin-d",
    "vitamin-e",
    "vitamin-k",
    "sugar",
    "zinc",
  ],
};

function Searching() {
  // * true if request to api is loading, false otherwise
  const [load, setLoad] = useState(true);
  // * searching query
  const [query, setQuery] = useState(null);
  // * result of searching query
  const [searchResult, setSearchResult] = useState(null);

  // # tab with all filter options
  const FilterTab = () => {

    return (
        <div>
            <button className="border-2">Filter</button>
        </div>
    );
  };

  // # encode and submit the query with filter parameters (if needed)
  const Sumbit = (e) => {
    //	TODO- error message (finish free daily request)
    e.preventDefault();
    // encoded query
    let par = scpar.prefix + "query=" + encodeURIComponent(query);
    // ! temp
    console.log(par);

    const request = () => {
      setLoad(true);
      fetch(par)
        .then((response) => response.json())
        .then((data) => {
          setSearchResult(data);
          setLoad(false);
          // ! temp
          console.log(data);
        });
    };

    request();
  };

  // # show the results to the user
  const resView = () => {
    //	TODO- nice result view
    if (load) {
      return <div>Loading...</div>;
    } else {
      return <div>first of {searchResult.totalResults} ({searchResult.number} avaible to see) : {searchResult.results[0].title}</div>;
    }
  };

  return (
    <div>
      <h1>Searching Recipes</h1>
          {/* filter button */}
          <FilterTab />
      {/* input form */}
      <form onSubmit={Sumbit}>
        <input
          className="border-2"
          type="text"
          placeholder="What recipe do u want?"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="border-2">
          Search
        </button>
      </form>
      {/* result view */}
      <div>{searchResult ? resView() : <></>}</div>
    </div>
  );
}

export default Searching;
