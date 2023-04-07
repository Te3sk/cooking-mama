// # ------------------------------------------------
// # SEARCHING RECIPES PAGE
// # ------------------------------------------------

import { React, useState, useEffect } from "react";
// import filterop from "./filterop";

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
  // * true if the user select at least one filter, false otherwise
  // const [filtered, setFiltered] = useState(false);

  // # tab with all filter options
  const FilterTab = () => {
    //	TODO- this filter shit
    // # COUSINES usestates
    // * if true, show all the cousines selectable
    const [showCousines, setShowCousines] = useState(false);
    // * (array) cousines selected by the user to be inclused, null if user doesn't select
    const [inCous, setInCous] = useState(null);
    // * (array) cousines selected by the user to be excluded, null if user doesn't select
    const [exCous, setExCous] = useState(null);
    // # DIET usestates
    // * if true, show all the diets selectable
    const [showDiet, setShowDiet] = useState(false);
    // * (array) diets selected by the user
    const [inDiets, setInDiets] = useState(null);
    // # INTOLLERANCE usestates
    // * if true, show all the intollerance selectable
    const [showIntollerance, setShowIntollerance] = useState(false);
    // * (array) intollerances selected by the user
    const [inIntollerance, setInIntollerance] = useState(null);
    // # INGREDIENTS usestates
    // * if true, show all the ingredients selectable
    const [showIngredients, setShowIngredients] = useState(false);
    // * (array) ingredients select by the user to be included
    const [inIngredients, setInIngredients] = useState(null);
    // * (array) ingredients select by the user to be included
    const [exIngredients, setExIngredients] = useState(null);
    // * (string) single ingredients write by the user (last)
    const [singIng, setSingIng] = useState(null);
    // * (array) list of all the ingredients wrote by the user
    const [ingList, setIngList] = useState(null);

    // # includes and excludes cousines from the query
    const opCousine = () => {
      //	TODO- graphical view
      //	TODO- mutual exclusion between include and exclude (if click "exclude" of an include element, remove it from included list)

      const handleIn = (e, x) => {
        //	TODO- clean code
        // console.log(Array.isArray(inCous));
        e.preventDefault();
        if (inCous == null || inCous === []) {
          // console.log("inCous empty");
          setInCous([x]);
        } else {
          // console.log(inCous);
          let temp = inCous.indexOf(x);
          if (temp >= 0) {
            // console.log(x + " deleted from inCous in position" + temp);
            inCous.splice(temp, 1);
          } else {
            // console.log(x + " added in inCous 'cause indexOf(x) = " + temp);
            setInCous([...inCous, x]);
          }
        }
        // console.log(inCous);
      };

      const handleEx = (e, x) => {
        //	TODO- clean code
        e.preventDefault();
        if (exCous == null || exCous === []) {
          console.log("exCous empty");
          setExCous([x]);
        } else {
          // console.log(exCous);
          let temp = exCous.indexOf(x);
          if (temp >= 0) {
            // console.log(x + " deleted from exCous in position" + temp);
            // def(x);
            exCous.splice(temp, 1);
          } else {
            // console.log(x + " added in exCous 'cause indexOf(x) = " + temp);
            setExCous([...exCous, x]);
          }
        }
        // console.log(exCous);
      };

      return (
        <div>
          <ul>
            {scpar.listOfCousine.map((x, index) => {
              return (
                <li key={index} className="flex flex-row justify-between">
                  <p className="ml-2">{x}</p>
                  <div className="flex flex-row">
                    <button
                      className="border-2"
                      onClick={(e) => handleIn(e, x)}
                    >
                      include
                    </button>
                    <button
                      className="border-2"
                      onClick={(e) => handleEx(e, x)}
                    >
                      exclude
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    };

    // # includes kind of diets in the query
    const OpDiet = () => {
      //	TODO- graphical view
      const handleCheck = (e) => {
        let updateList;

        if (inDiets) {
          updateList = [...inDiets];
          if (e.target.checked) {
            updateList = [...inDiets, e.target.value];
          } else {
            updateList.splice(inDiets.indexOf(e.target.value), 1);
          }
        } else {
          updateList = [e.target.value];
        }

        setInDiets(updateList);
      };

      return (
        <div>
          <ul>
            {scpar.listOfDiet.map((x, index) => {
              return (
                <li key={index} className="flex flex-row justify-start">
                  <input type="checkbox" value={x} onChange={handleCheck} />
                  <p>{x}</p>
                </li>
              );
            })}
          </ul>
        </div>
      );
    };

    // # include kind of intollerances in the query
    const OpIntollerance = () => {
      //	TODO- graphical view
      const handleCheck = (e) => {
        let updateList;

        if (inIntollerance) {
          updateList = [...inIntollerance];
          if (e.target.checked) {
            updateList = [...inIntollerance, e.target.value];
          } else {
            updateList.splice(inIntollerance.indexOf(e.target.value), 1);
          }
        } else {
          updateList = [e.target.value];
        }

        setInIntollerance(updateList);
      };

      return (
        <div>
          <ul>
            {scpar.listOfIntollerance.map((x, index) => {
              return (
                <li key={index} className="flex flex-row justify-start">
                  <input type="checkbox" value={x} onChange={handleCheck} />
                  <p>{x}</p>
                </li>
              );
            })}
          </ul>
        </div>
      );
    };

    // # includes and excludes ingredients from the query
    const OpIngredients = () => {
      //	TODO- graphical view
      //	TODO- mutual exclusion
      //	TODO- cancell button for ingredients

      // * input submit: add the element wrote by the user in the list of element (ingList)
      const insub = (e) => {
        e.preventDefault();
        if (ingList) {
          setIngList([...ingList, singIng]);
        } else {
          setIngList([singIng]);
        }
        e.target.reset();
      };

      // * handle the include selection by the user of an element in the list, add it to inIngredients
      const handleIn = (e, x) => {
        e.preventDefault();
        if (inIngredients && inIngredients.indexOf(x) < 0) {
          setInIngredients([...inIngredients, x]);
        } else {
          setInIngredients([x]);
        }

        // if (exIngredients && exIngredients.indexOf(x) >= 0) {
        //   setExIngredients(
        //     exIngredients.splice(exIngredients.indexOf(x), 1)
        //   );
        // }

        // ! temp
        console.log("included:");
        console.log(inIngredients);
        console.log("excluded:");
        console.log(exIngredients);
      };

      // * handle the exclude selection by the user of an element in the list, add it to exIngredients
      const handleEx = (e, x) => {
        e.preventDefault();
        if (exIngredients && exIngredients.indexOf(x) < 0) {
          setExIngredients([...exIngredients, x]);
        } else {
          setExIngredients([x]);
        }

        // if (inIngredients && inIngredients.indexOf(singIng) >= 0) {
        //   setInIngredients(
        //     inIngredients.splice(inIngredients.indexOf(x), 1)
        //   );
        // }

        // ! temp
        console.log("included:");
        console.log(inIngredients);
        console.log("excluded:");
        console.log(exIngredients);
      };

      // * remove the item from ingList
      const handleCancel = (e, x) => {
        e.preventDefault();
        console.log(ingList.splice(ingList.indexOf(x), 1));
        console.log(ingList);
        setShowIngredients(false);
        setTimeout(
        setShowIngredients(true), 10);
      }

      return (
        <div>
          <form onSubmit={insub}>
            <input
              type="text"
              className="border-2"
              onChange={(e) => setSingIng(e.target.value)}
            />
            <button className="border-2" type="submit">
              submit
            </button>
          </form>
          {ingList ? (
            <>
              <ul>
                {ingList.map((x, index) => {
                  return (
                    <li key={index} className="flex flex-row justify-between">
                      <p>{x}</p>
                      {/* include */}
                      <button className="border-2" onClick={e => handleIn(e,x)}>
                        1
                      </button>
                      {/* exclude */}
                      <button className="border-2" onClick={e => handleEx(e,x)}>
                        2
                      </button>
                      {/* cancel */}
                      <button className="border-2" onClick={e => handleCancel(e,x)}>3</button>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <></>
          )}
        </div>
      );
    };

    return (
      <div className="flex flex-col">
        {/* show cousines button */}
        <button
          className="border-2"
          onClick={(e) => {
            setShowCousines(!showCousines);
            if (showCousines === true) {
              setInCous(null);
              setExCous(null);
            }
          }}
        >
          {showCousines ? "close and cancell" : "Include / exclude Cousine"}
        </button>
        {/* cousines filter tab */}
        {showCousines ? (
          <>
            {opCousine()}
            <button
              className="border-2"
              onClick={(e) => {
                setShowCousines(false);
              }}
            >
              save
            </button>
          </>
        ) : (
          <></>
        )}
        {/* show diet botton */}
        <button
          className="border-2"
          onClick={(e) => {
            setShowDiet(!showDiet);
            if (showDiet) {
              setInDiets(null);
            }
          }}
        >
          {showDiet ? "close and cancell" : "include Diets"}
        </button>
        {/* diet filter tab */}
        {showDiet ? (
          <>
            {OpDiet()}
            <button className="border-2" onClick={(e) => setShowDiet(false)}>
              save
            </button>
          </>
        ) : (
          <></>
        )}
        {/* show intollerances button */}
        <button
          className="border-2"
          onClick={(e) => {
            setShowIntollerance(!showIntollerance);
            if (showIntollerance) {
              setInIntollerance(null);
            }
          }}
        >
          {showIntollerance ? "close and cancell" : "Intollerance"}
        </button>
        {/* intollerance filter tab */}
        {showIntollerance ? (
          <>
            {OpIntollerance()}
            <button
              className="border-2"
              onClick={(e) => setShowIntollerance(false)}
            >
              save
            </button>
          </>
        ) : (
          <></>
        )}
        {/* show ingredients button */}
        <button
          className="border-2"
          onClick={(e) => {
            setShowIngredients(!showIngredients);
            if (showIngredients) {
              setInIngredients(null);
              setExIngredients(null);
              setIngList(null);
              setSingIng(null);
            }
          }}
        >
          {showIngredients
            ? "close and cancel"
            : "Include / exclude ingredients"}
        </button>
        {/* include and exclude ingredients filter tab */}
        {showIngredients ? (
          <>
            {OpIngredients()}
            <button
              className="border-2"
              onClick={(e) => setShowIngredients(false)}
            >
              save
            </button>
          </>
        ) : (
          <></>
        )}
        <button className="border-2">Sort element by</button>
        <button className="border-2">Sort direction</button>
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
      return (
        <div className="flex flex-col items-center">
          {/* <FilterTab /> */}
          <u>
            {searchResult.number} results of {searchResult.totalResults}
          </u>
          <ul>
            {searchResult.results.map((k) => (
              <li key={k.id}>{k.title}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-row justify-between">
      <FilterTab />
      <div className="flex flex-col items-center mx-5">
        <h1>Searching Recipes</h1>
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
          {/* result view */}
          <div>{searchResult ? resView() : <></>}</div>
        </form>
      </div>
    </div>
  );
}

export default Searching;
