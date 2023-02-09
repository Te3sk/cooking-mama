// # ------------------------------------------------
// # SEARCING RECIPES PAGE
// # ------------------------------------------------

/* TODO
  - finish include ingredients
  - view result 
  - fix macro-cancel button that don't show after cancel a sub-filter-tab
  - fix the subtab that close themself before the submit
*/

import React, { useState, useEffect } from "react";

// * general prefix of the api get request
const prefix =
  "https://api.spoonacular.com/recipes/complexSearch?apiKey=6eef74cb8a6d4fc8afd1d4010381f7b2&";
// * list of the cousines avaible from the api (as string)
const listOfCousine = [
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
];
// * list of the diet avaible from the api (as string)
const listOfDiet = [
  "gluten free",
  "ketogenic",
  "vegetarian",
  "lacto-vegetarian",
  "ovo-vegetarian",
  "vegan",
  "pescetarian",
  "paleo",
];
// * list of the intollerance avaible from the api (as string)
const listOfIntollerance = [
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
];
// * list of the sort options
const listOfSortOptions = [
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
];

function Searcing() {
  // * searcing query
  const [query, setQuery] = useState(null);
  // * searcing result (json)
  const [searchResult, setSearchResult] = useState(null);
  // * if true, show the filter form
  const [filterForm, setFilterForm] = useState(false);
  // * if false don't show cancel button when a sub-filter-tab is open
  const [subFilter, setSubFilters] = useState(true);
  // * true if the user filter by cousine
  const [cousineFilter, setCousineFilter] = useState(false);
  // * list of the cousines selected by the user (if [] select all)
  const [checkedCousine, setCheckedCousine] = useState(listOfCousine);
  // * true if the user filter by excluding some cousines
  const [excludeCousineFilter, setExcludeCousineFilter] = useState(false);
  // * list of the cousines selected to be excluded by the user
  const [excludedCousine, setExcludedCousine] = useState([]);
  // * true if the user filter by diet
  const [dietFilter, setDietFilter] = useState(false);
  // * list of the diet selected by the user
  const [checkedDiet, setCheckedDiet] = useState([]);
  // * true if the user filter by intollerance
  const [intolleranceFilter, setIntolleranceFilter] = useState(false);
  // * list of the intollerance selected by the user
  const [checkedIntollerance, setCheckedIntollerance] = useState([]);
  // * true if the user sorted elements
  const [sorted, setSorted] = useState(false);
  // * sorting parameter selected by the user
  const [sortParameter, setSortParameter] = useState("");
  // * sort direction selected by the user (default ascending)
  const [sortDirection, setSortDirection] = useState("asc");
  // * number of results selected by the user (if he doesn't do it is null)
  const [resNum, setResNumb] = useState(null);
  // * true if the user write some ingredients to include
  const [includeIng, setIncludeIngr] = useState(false);
  // * list of ingredients to include writed by user (one string)
  const [ingredients, setIngredients] = useState(null);

  // # get request to the api and return set the response in `searchResult`
  const Search = async (txt) => {
    let par = prefix + "query=" + encodeURIComponent(txt);

    // * if the user filter by cousines add it to query
    if (cousineFilter) {
      par = par + "&cousine=" + checkedCousine.join(",");
    }
    // * if the user filter by excluding cousines add it to query
    if (excludeCousineFilter) {
      par = par + "&excludeCuisine=" + excludedCousine.join(",");
    }
    // * if the user filter by diet add it to query
    if (dietFilter) {
      par = par + "&diet=" + checkedDiet.join(",");
    }
    // * if the user filter by intollerance add it to query
    if (intolleranceFilter) {
      par = par + "&intolerances=" + checkedIntollerance.join(",");
    }
    // * if the user sorted elements add it to query
    if (sorted) {
      par = par + "&sort=" + sortParameter;
    }
    // * add to query the sort direction
    par = par + "&sortDirection=" + sortDirection;
    // * if the user select a number of result add it to query
    if (resNum) {
      par = par + "&number=" + resNum;
    }

    // ! temp console log to check if it's correct
    console.log(par);

    fetch(par)
      .then((response) => response.json())
      .then((data) => setSearchResult(data));
  };

  const Submit = (e) => {
    e.preventDefault();
    Search(query);
    console.log(searchResult);
  };

  // # the tab where the user can filter his query with lot choices
  const FilterTab = () => {
    // * current sub-filter-tab
    const [currentChoice, setCurrentChoice] = useState(null);
    /* todo
      - include ingredients
    */

    // # set witch sub-filter-tab show (null if none)
    const CurrentViewer = () => {
      switch (currentChoice) {
        case null:
          return <></>;
        case "cousine":
          return <ChoiceCousine />;
        case "excludeCousine":
          return <ExcludeCousine />;
        case "diet":
          return <Diet />;
        case "intollerance":
          return <Intollerance />;
        case "sort":
          return <Sorting />;
        case "ingr":
          return <Ingredients />;
        default:
          return <p>error</p>;
      }
    };

    // # sub-filter-tab to choice the cousines to witch the recipes belong
    const ChoiceCousine = () => {
      const handleCheck = (e) => {
        e.preventDefault();
        let updateList = [...checkedCousine];
        if (e.target.checked) {
          updateList = [...checkedCousine, e.target.value];
        } else {
          updateList.splice(checkedCousine.indexOf(e.target.value), 1);
        }

        setCheckedCousine(updateList);
      };

      const submbitChoice = (e) => {
        setCurrentChoice(null);
        setSubFilters(true);

        if (checkedCousine == []) {
          setCheckedCousine(listOfCousine);
        }

        setCousineFilter(true);
      };

      return (
        <div>
          {listOfCousine.map((x, index) => {
            return (
              <li key={index}>
                <input
                  value={x}
                  type="checkbox"
                  onChange={handleCheck}
                  checked={checkedCousine.includes(x)}
                />
                <p>{x}</p>
              </li>
            );
          })}
          <button
            className="border-2"
            onClick={(e) => {
              setCheckedCousine([]);
              submbitChoice(e);
            }}
          >
            Choice all
          </button>
          <button className="border-2" onClick={submbitChoice}>
            Save choices
          </button>
        </div>
      );
    };

    // # sub-filter-tab to choiche the cousines witch the recipes belong to excluded from the query
    const ExcludeCousine = () => {
      const handleCheck = (e) => {
        e.preventDefault();
        let updateList = [...excludedCousine];
        if (e.target.checked) {
          updateList = [...excludedCousine, e.target.value];
        } else {
          updateList.splice(excludedCousine.indexOf(e.target.value), 1);
        }

        setExcludedCousine(updateList);
      };

      const submbitChoice = (e) => {
        setCurrentChoice(null);
        setSubFilters(true);

        setExcludeCousineFilter(true);
      };

      return (
        <div>
          {listOfCousine.map((x, index) => {
            return (
              <li key={index}>
                <input
                  value={x}
                  type="checkbox"
                  onChange={handleCheck}
                  checked={excludedCousine.includes(x)}
                />
                <p>{x}</p>
              </li>
            );
          })}
          <button
            className="border-2"
            onClick={(e) => {
              setCheckedCousine([]);
              submbitChoice(e);
            }}
          >
            Choice all
          </button>
          <button className="border-2" onClick={submbitChoice}>
            Save choices
          </button>
        </div>
      );
    };

    // # sub-filter-tab to choice the diets to witch the recipes belong
    const Diet = () => {
      const submbitChoice = (e) => {
        e.preventDefault();
        setDietFilter(true);
        setSubFilters(true);
        setCurrentChoice(null);
      };

      const handleCheck = (e) => {
        e.preventDefault();
        let updateList = [...checkedDiet];
        if (e.target.checked) {
          updateList = [...checkedDiet, e.target.value];
        } else {
          updateList.splice(checkedDiet.indexOf(e.target.value), 1);
        }

        setCheckedDiet(updateList);
      };

      return (
        <div>
          {listOfDiet.map((x, index) => {
            return (
              <li key={index}>
                <input
                  type="checkbox"
                  value={x}
                  checked={checkedDiet.includes(x)}
                  onChange={handleCheck}
                />
                <p>{x}</p>
              </li>
            );
          })}
          <button className="border-2" onClick={submbitChoice}>
            Save choices
          </button>
          <button
            className="border-2"
            onClick={(e) => {
              e.preventDefault();
              setCurrentChoice(null);
            }}
          >
            Cancel
          </button>
        </div>
      );
    };

    // # sub-filter-tab to choice the diets to witch the recipes belong
    const Intollerance = () => {
      const submbitChoice = (e) => {
        e.preventDefault();
        setIntolleranceFilter(true);
        setCurrentChoice(null);
        setSubFilters(true);
      };

      const handleCheck = (e) => {
        e.preventDefault();
        let updateList = [...checkedIntollerance];
        if (e.target.checked) {
          updateList = [...checkedIntollerance, e.target.value];
        } else {
          updateList.splice(checkedIntollerance.indexOf(e.target.value), 1);
        }

        setCheckedIntollerance(updateList);
      };

      return (
        <div>
          {listOfIntollerance.map((x, index) => {
            return (
              <li key={index}>
                <input
                  type="checkbox"
                  value={x}
                  checked={checkedIntollerance.includes(x)}
                  onChange={handleCheck}
                />
                <p>{x}</p>
              </li>
            );
          })}
          <button className="border-2" onClick={submbitChoice}>
            Save choices
          </button>
          <button
            className="border-2"
            onClick={(e) => {
              e.preventDefault();
              setCurrentChoice(null);
            }}
          >
            Cancel
          </button>
        </div>
      );
    };

    // # sub-filter-tab to insert witch ingredients the user want to include in the recipe
    const Ingredients = () => {

      const submit = (e) => {
        e.preventDefault();
        setIncludeIngr(true);
        setCurrentChoice(null);
        setSubFilters(true);
      }

      return (
        <div>
          <form onSubmit={submit}>
            <p>write the ingredients you want to include separated by a comma (no space)</p>
            <input
              type="text"
              onChange={(e) => {
                e.preventDefault();
                setIngredients(e.target.value)
              }}
            />
            <button className="border-2" type="submit">save</button>
            <button
              className="border-2"
              onClick={(e) => {
                e.preventDefault();
                setCurrentChoice(null);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      );
    };

    // # sub-filter-tab to sort element by a lot of parameters
    const Sorting = () => {
      const handleCheck = (e) => {
        e.preventDefault();
        setSortParameter(e.target.value);
        setSorted(true);
      };

      return (
        <div>
          {listOfSortOptions.map((x) => {
            return (
              <div key={x}>
                <input
                  type="checkbox"
                  value={x}
                  onChange={handleCheck}
                  checked={x == sortParameter}
                />
                <p>{x}</p>
              </div>
            );
          })}
          <button
            className="border-2"
            onClick={(e) => {
              e.preventDefault();
              setSortParameter(null);
              setCurrentChoice(null);
              setSorted(false);
            }}
          >
            {sortParameter ? "Empty Filter" : "Cancel"}
          </button>
        </div>
      );
    };

    return (
      <div>
        {/* filter buttons */}
        <div>
          {/* choice cousine */}
          <button
            className="border-2"
            onClick={(e) => {
              e.preventDefault();
              setCurrentChoice("cousine");
              setSubFilters(false);
            }}
          >
            Choice Cousine
          </button>
          {/* exclude cousine */}
          <button
            className="border-2"
            onClick={(e) => {
              e.preventDefault();
              setCurrentChoice("excludeCousine");
              setSubFilters(false);
            }}
          >
            Exclude Cousine
          </button>
          {/* diet */}
          <button
            className="border-2"
            onClick={(e) => {
              e.preventDefault();
              setSubFilters(false);
              setCurrentChoice("diet");
            }}
          >
            Diet
          </button>
          {/* intollerance */}
          <button
            className="border-2"
            onClick={(e) => {
              e.preventDefault();
              setSubFilters(false);
              setCurrentChoice("intollerance");
            }}
          >
            Intollerance
          </button>
          {/* include ingredients */}
          <button
            className="border-2"
            onClick={(e) => {
              e.preventDefault();
              setSubFilters(false);
              setCurrentChoice("ingr");
            }}
          >
            Include ingredients
          </button>
          {/* sort element */}
          <button
            className="border-2"
            onClick={(e) => {
              e.preventDefault();
              setSubFilters(false);
              setCurrentChoice("sort");
            }}
          >
            Sort Element
          </button>
          {/* sort direction */}
          <button
            className="border-2"
            onClick={(e) => {
              e.preventDefault();
              {
                sortDirection == "asc"
                  ? setSortDirection("desc")
                  : setSortDirection("asc");
              }
            }}
          >
            Sort Direction: {sortDirection}
          </button>
          {/* number of results */}
          <form className="border-2 w-fit">
            Number of results
            <input
              type="number"
              min="1"
              max="100"
              onChange={(e) => {
                e.preventDefault();
                setResNumb(e.target.value);
              }}
              value={resNum}
            />
          </form>
        </div>
        <CurrentViewer />
      </div>
    );
  };

  return (
    <div>
      <h1>Searcing Recipes</h1>
      <form onSubmit={Submit}>
        <input
          className="border-2"
          type="text"
          placeholder="what recipes do u want?"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="border-2">
          Search
        </button>
      </form>
      <button
        className="border-2"
        onClick={(e) => {
          setFilterForm(true);
        }}
      >
        Filter
      </button>
      {filterForm ? (
        <div>
          <FilterTab />
          {subFilter ? (
            <button
              className="border-2"
              onClick={(e) => {
                e.preventDefault();
                setFilterForm(false);
              }}
            >
              Macro-Cancel
            </button>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Searcing;