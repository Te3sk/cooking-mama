// # ------------------------------------------------
// # SEARCHING RECIPES PAGE
// # ------------------------------------------------

import { React, useState, useEffect } from "react";
import styles from "../styles.json";
// import filterop from "./filterop";

const cardPrefix = "https://api.spoonacular.com/recipes/";
const cardSuffix = "/card?apiKey=6eef74cb8a6d4fc8afd1d4010381f7b2";

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
  //	TODO- submit again when set filters
  //	TODO- center search bar with title

  // * true if request to api is loading, false otherwise
  const [load, setLoad] = useState(true);
  // * searching query
  const [query, setQuery] = useState(null);
  // * result of searching query
  const [searchResult, setSearchResult] = useState(null);
  // * (array) cousines selected by the user to be inclused, null if user doesn't select
  const [inCous, setInCous] = useState(null);
  // * (array) cousines selected by the user to be excluded, null if user doesn't select
  const [exCous, setExCous] = useState(null);
  // * (array) diets selected by the user
  const [inDiets, setInDiets] = useState(null);
  // * (array) intollerances selected by the user
  const [inIntollerance, setInIntollerance] = useState(null);
  // * (array) ingredients select by the user to be included
  const [inIngredients, setInIngredients] = useState(null);
  // * (array) ingredients select by the user to be included
  const [exIngredients, setExIngredients] = useState(null);
  // * current sorting option choose by the user
  const [curSort, setCurSort] = useState(null);
  // * sorting direction
  const [sortDir, setSortDir] = useState("asc");

  // # tab with all filter options
  const FilterTab = () => {
    //	TODO- this filter shit
    //	TODO- number of results sub-tab
    // # COUSINES usestates
    // * if true, show all the cousines selectable
    const [showCousines, setShowCousines] = useState(false); //	TODO- CHANGE IN TRUE
    // # DIET usestates
    // * if true, show all the diets selectable
    const [showDiet, setShowDiet] = useState(false); //	TODO- CHANGE IN TRUE
    // # INTOLLERANCE usestates
    // * if true, show all the intollerance selectable
    const [showIntollerance, setShowIntollerance] = useState(true); //	TODO- CHANGE IN TRUE
    // # INGREDIENTS usestates
    // * if true, show all the ingredients selectable
    const [showIngredients, setShowIngredients] = useState(true);
    // * (string) single ingredients write by the user (last)
    const [singIng, setSingIng] = useState(null);
    // * (array) list of all the ingredients wrote by the user
    const [ingList, setIngList] = useState(null);
    // # SORT OPTION usestates
    // * if true, show all sorting option selectable
    const [showSort, setShowSort] = useState(true);

    // # includes and excludes cousines from the query
    const OpCousine = () => {
      //	TODO- when click a selected button, doesn't deselect it
      //	TODO- reset button
      //	TODO- columns at different height
      //	TODO- allign the two button in the center vertically in the rows with 2 lines

      // * handle inclusion button click
      const handleIn = (e, x) => {
        e.preventDefault();
        if (inCous == null || inCous === []) {
          // if inCous isn't initalized or is empty set the array with 1 item
          let temp = [x];
          console.log(temp);
          setInCous(temp);
        } else {
          let temp = inCous.indexOf(x);
          if (temp >= 0) {
            // else if the element is already in the array, remove it
            inCous.splice(temp, 1);
          } else {
            // else check if the item is in the other array and if so remove the item from it
            if (!(exCous == null && exCous === [])) {
              let temp = exCous.indexOf(x);
              if (temp >= 0) {
                exCous.splice(temp, 1);
              }
              // then push it
              setInCous([...inCous, x]);
            }
          }
        }
      }

      // * handle exclusion button click
      const handleEx = (e, x) => {
        e.preventDefault();
        if (exCous == null || exCous === []) {
          // if inCous isn't initalized or is empty set the array with 1 item
          setExCous([x]);
        } else {
          let temp = exCous.indexOf(x);
          if (temp >= 0) {
            // else if the element is already in the array, remove it
            exCous.splice(temp, 1);
          } else {
            // else check if the item is in the other array and if so remove the item from it
            if (!(inCous == null && inCous === [])) {
              let temp = inCous.indexOf(x);
              if (temp >= 0) {
                inCous.splice(temp, 1);
              }
            }
            // then push it
            setExCous([...exCous, x]);
          }
        }
      };

      return (
        //	TODO- clean code
        <div className="columns-2">
          <ul>
            {scpar.listOfCousine.map((x, index) => {
              return (
                <li
                  key={index}
                  className="flex flex-row justify-between my-2 border-b-[1px] border-b-lightGray"
                >
                  <p className="-2">{x}</p>
                  <div className="flex flex-row w-16 justify-between">
                    <button
                      // className={inCous ? (inCous.include(x) ? styles.BinButSel : styles.BinButNot) : styles.BinButNot}
                      className={
                        inCous
                          ? inCous.indexOf(x) >= 0
                            ? styles.BinButSel
                            : // ? ("rounded-full w-14 h-7 (temp w) bg-orange hover:opacity-75 font-bold text-sm")
                              styles.BinButNot
                          : // : ("rounded-full w-14 h-7 (temp w) hover:bg-orange hover:opacity-75 font-bold text-sm")
                            styles.BinButNot
                        // : ("rounded-full w-14 h-7 (temp w) hover:bg-orange hover:opacity-75 font-bold text-sm")
                      }
                      // className="border-2"
                      onClick={(e) => handleIn(e, x)}
                      // onClick={(e) => console.log(x + " -------- type: " + typeof x)}
                    >
                      IN
                    </button>
                    <button
                      className={
                        exCous
                          ? exCous.indexOf(x) >= 0
                            ? styles.BinButSel
                            : // ? ("rounded-full w-14 h-7 (temp w) bg-orange hover:opacity-75 font-bold text-sm")
                              styles.BinButNot
                          : // : ("rounded-full w-14 h-7 (temp w) hover:bg-orange hover:opacity-75 font-bold text-sm")
                            styles.BinButNot
                        // : ("rounded-full w-14 h-7 (temp w) hover:bg-orange hover:opacity-75 font-bold text-sm")
                      }
                      onClick={(e) => handleEx(e, x)}
                    >
                      EX
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
      //	TODO- insert checked checkbox svg (link above)

      const selected = (x) => {
        return (inDiets == null || inDiets === [])
        ? false
        : (inDiets.indexOf(x) >= 0)
          ? true
          : false
      }

      const handleCheck = (e, x) => {
        let updateList;

        if (inDiets) {
          updateList = [...inDiets];
          if (!selected(x)) {
            updateList = [...inDiets, x];
          } else {
            updateList.splice(inDiets.indexOf(x), 1);
          }
        } else {
          updateList = [x];
        }

        setInDiets(updateList);
      };

      return (
        <div className="columns-2">
          <ul>
            {scpar.listOfDiet.map((x, index) => {
              return (
                <li key={index} className="flex flex-row my-2" onClick={(e) => {handleCheck(e,x)}}>
                  {/* link for the selected one to download
                  https://iconscout.com/icon/checkbox-2666234 */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="check-box"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z"></path></svg>
                  <p className={selected(x) ? styles.chbxTextSel : styles.chbxTextNot}>
                    {x}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      );
    };

    // # include kind of intollerances in the query
    const OpIntollerance = () => {
      
      const selected = (x) => {
        return (inIntollerance == null || inIntollerance === [])
        ? false
        : (inIntollerance.indexOf(x) >= 0)
          ? true
          : false
      }

      const handleCheck = (e, x) => {
        let updateList;

        if (inIntollerance) {
          updateList = [...inIntollerance];
          if (!selected(x)) {
            updateList = [...inIntollerance, x];
          } else {
            updateList.splice(inIntollerance.indexOf(x), 1);
          }
        } else {
          updateList = [x];
        }

        setInIntollerance(updateList);
      };

      return (
        <div className="columns-2">
          <ul>
            {scpar.listOfIntollerance.map((x, index) => {
              return (
                <li key={index} className="flex flex-row justify-start" onClick={(e) => {handleCheck(e,x)}}>
                  {/* link for the selected one to download
                  https://iconscout.com/icon/checkbox-2666234 */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="check-box"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z"></path></svg>
                  <p className={selected(x) ? styles.chbxTextSel : styles.chbxTextNot}>
                    {x}
                  </p>
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
      //	TODO- can't type in input field

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
        // insert the ingredient in the list or initalize it with the element
        if (inIngredients && inIngredients.indexOf(x) < 0) {
          setInIngredients([...inIngredients, x]);
        } else {
          setInIngredients([x]);
        }

        // if the element is in the excluded list, remove from it
        if (exIngredients && exIngredients.indexOf(x) >= 0) {
          setExIngredients((current) => current.filter((ing) => ing !== x));
          console.log(exIngredients);
        }

        // ! temp
        console.log("included:");
        console.log(inIngredients);
        console.log("excluded:");
        console.log(exIngredients);
      };

      // * handle the exclude selection by the user of an element in the list, add it to exIngredients
      const handleEx = (e, x) => {
        e.preventDefault();
        // insert the ingredient in the list or initalize it with the element
        if (exIngredients && exIngredients.indexOf(x) < 0) {
          setExIngredients([...exIngredients, x]);
        } else {
          setExIngredients([x]);
        }

        // if the element is in the included list, remove from it
        if (inIngredients && inIngredients.indexOf(x) >= 0) {
          setInIngredients((current) => current.filter((ing) => ing !== x));
          console.log(inIngredients);
        }

        // ! temp
        console.log("included:");
        console.log(inIngredients);
        console.log("excluded:");
        console.log(exIngredients);
      };

      // * remove the item from ingList
      const handleCancel = (e, x) => {
        e.preventDefault();
        setIngList((current) => current.filter((ing) => ing !== x));

        if (inIngredients.indexOf(x) >= 0) {
          setInIngredients((current) => current.filter((ing) => ing !== x));
        } else if (exIngredients.indexOf(x) >= 0) {
          setExIngredients((current) => current.filter((ing) => ing !== x));
        }

        // ! temp
        console.log("included:");
        console.log(inIngredients);
        console.log("excluded:");
        console.log(exIngredients);
      };

      return (
        <div>
          <form onSubmit={insub} className="flex flex-row my-4">
            <input
              id="ingrInput"
              type="text"
              className={styles.searchBar + " w-3/4"}
              placeholder="Write your ingredients ..."
              onChange={(e) => {setSingIng(e.target.value)}}
                />
            <button className={styles.searchBut + " w-1/4"} type="submit">
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
                      <button
                        className="border-2"
                        onClick={(e) => handleIn(e, x)}
                      >
                        1
                      </button>
                      {/* exclude */}
                      <button
                        className="border-2"
                        onClick={(e) => handleEx(e, x)}
                      >
                        2
                      </button>
                      {/* cancel */}
                      <button
                        className="border-2"
                        onClick={(e) => handleCancel(e, x)}
                      >
                        3
                      </button>
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

    // # user can choose the sorting option
    const OpSorting = () => {
      return (
        <ul>
          {scpar.listOfSortOptions.map((x, index) => {
            return (
              <li key={index}>
                <p
                  onClick={(e) => {
                    setCurSort(x);
                    setShowSort(false);
                    console.log(curSort);
                  }}
                >
                  {x}
                </p>
              </li>
            );
          })}
        </ul>
      );
    };

    const deleteFilters = (e) => {
      e.preventDefault();
      setInCous(null);
      setExCous(null);
      setInDiets(null);
      setInIntollerance(null);
      setInIngredients(null);
      setExIngredients(null);
      setCurSort(null);
      setSortDir("asc");
      //! temp
      console.log("filter deleted");
    };

    const Ddicon = () => {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g
            id="feDropDown0"
            fill="none"
            fillRule="evenodd"
            stroke="none"
            strokeWidth="1"
          >
            <g id="feDropDown1" fill="#7c7c7c">
              <path id="feDropDown2" d="m5 8l7 8l7-8z" />
            </g>
          </g>
        </svg>
      );
    };

    const Dupicon = () => {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g
            id="feDropUp0"
            fill="none"
            fillRule="evenodd"
            stroke="none"
            strokeWidth="1"
          >
            <g id="feDropUp1" fill="#7c7c7c">
              <path id="feDropUp2" d="m12 8l7 8H5z" />
            </g>
          </g>
        </svg>
      );
    };

    return (
      <div className="flex flex-col h-full mx-5 overflow-scroll">
        {/* show cousines button */}
        <div className="w-full flex flex-col">
          <div
            className={styles.filterSubHeader}
            onClick={(e) => {
              setShowCousines(!showCousines);
              if (showCousines === true) {
                setInCous(null);
                setExCous(null);
              }
            }}
          >
            <p className={styles.filterSubTitle}>
              {/* {showCousines ? "close and cancell" : "Include / exclude Cousines"} */}
              Include / exclude Cousines
            </p>
            <button
              className=""
              onClick={(e) => {
                setShowCousines(!showCousines);
                if (showCousines === true) {
                  setInCous(null);
                  setExCous(null);
                }
              }}
            >
              {/* {showCousines ? "close and cancell" : "Include / exclude Cousine"} */}
              {showCousines ? <Dupicon /> : <Ddicon />}
            </button>
          </div>
          {/* cousines filter tab */}
          {showCousines ? <OpCousine /> : <></>}
        </div>
        {/* show diet botton */}
        <div className="w-full flex flex-col">
          <div
            className={styles.filterSubHeader}
            onClick={(e) => {
              setShowDiet(!showDiet);
              if (showDiet) {
                setInDiets(null);
              }
            }}
          >
            <p className={styles.filterSubTitle}>Include Diets</p>
            <button
              onClick={(e) => {
                setShowDiet(!showDiet);
                if (showDiet) {
                  setInDiets(null);
                }
              }}
            >
              {showDiet ? <Dupicon /> : <Ddicon />}
            </button>
          </div>
          {/* diet filter tab */}
          {showDiet ? (
            <>
              <OpDiet />
            </>
          ) : (
            <></>
          )}
        </div>
        {/* show intollerances button */}
        <div className="w-full flex flex-col">
          <div className={styles.filterSubHeader}>
            <p className={styles.filterSubTitle}>Select Intollerances</p>
            <button
              onClick={(e) => {
                setShowIntollerance(!showIntollerance);
                if (showIntollerance) {
                  setInIntollerance(null);
                }
              }}
            >
              {showIntollerance ? <Dupicon /> : <Ddicon />}
            </button>
          </div>
          {/* intollerance filter tab */}
          {showIntollerance ? (
            <>
              <OpIntollerance />
            </>
          ) : (
            <></>
          )}
        </div>
        {/* show ingredients button */}
        <div className="w-full flex flex-col">
          <div className={styles.filterSubHeader}>
            <p className={styles.filterSubTitle}>
              Include / exclude Ingredients
            </p>
            <button
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
              {showIngredients ? <Dupicon /> : <Ddicon />}
            </button>
          </div>
          {/* include and exclude ingredients filter tab */}
          {showIngredients ? (
            <>
              <OpIngredients />
            </>
          ) : (
            <></>
          )}
        </div>
        {/* sorting element */}
        <div className="w-full flex flex-col">
          <div className={styles.filterSubHeader}>
            <p className={styles.filterSubTitle}>
              Sort element by {curSort ? curSort : ""}
            </p>
            <button onClick={(e) => setShowSort(!showSort)}>
              {showSort ? <Dupicon /> : <Ddicon />}
            </button>
          </div>
          {/* sorting option filter tab */}
          {showSort ? <OpSorting /> : <></>}
        </div>
        {/* sort direction */}
        <div className="w-full flex flex-col">
          <div className={styles.filterSubHeader}>
            <p className={styles.filterSubTitle}>Sort direction</p>
            <div>
              <button
                className={
                  sortDir === "asc" ? styles.BinButSel : styles.BinButNot
                }
                onClick={(e) => setSortDir("asc")}
              >
                ASC
              </button>
              <button
                className={
                  sortDir === "desc" ? styles.BinButSel : styles.BinButNot
                }
                onClick={(e) => setSortDir("desc")}
              >
                DESC
              </button>
            </div>
          </div>
        </div>
        {/* delete filters */}
        <button className="border-2" onClick={deleteFilters}>
          cancel filters
        </button>
      </div>
    );
  };

  // # encode and submit the query with filter parameters (if needed)
  const Sumbit = (e) => {
    //	TODO- error message (finish free daily request)
    e.preventDefault();
    // encoded query
    //	TODO- decide how many result see in once
    let par = scpar.prefix + "number=10&query=" + encodeURIComponent(query);

    if (inCous) {
      par = par + "&cousine=" + inCous.join(",");
    }
    if (exCous) {
      par = par + "&excludeCousine=" + exCous.join(",");
    }
    if (inDiets) {
      // here with comma means AND, with pipe (|) means OR
      par = par + "&diet=" + inDiets.join(",");
    }
    if (inIntollerance) {
      par = par + "&intollerances=" + inIntollerance.join(",");
    }
    if (inIngredients) {
      par = par + "&includeIngredients=" + inIngredients.join(",");
    }
    if (exIngredients) {
      par = par + "&excludeIngredients=" + exIngredients.join(",");
    }
    if (curSort) {
      par = par + "&sort=" + curSort;
    }

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
  const ResView = () => {
    //	TODO- nice result view
    //	TODO- fit results in the page with scroll

    const card = (id) => {
      let url = cardPrefix + id + cardSuffix;
      //	TODO- finish this (api limit reached)

      const request = () => {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            //!temp
            console.log(data.url);
            // return data.url;
          });
      };

      // console.log(url);
      return request();
    };

    const FailureView = () => {
      return (
        <div className="text-center w-2/3">
          <p className="text-center font-kanit text-darkOrange underline text-[27px]">
            {"Error Code:\t" + searchResult.code}
          </p>
          <p className="text-msgSize text-grey mt-4">{searchResult.message}</p>
        </div>
      );
    };

    if (load) {
      // # loading page
      return (
        //	TODO- center loading (maybe center the upper bar)
        <div className="flex justify-center w-full h-full">
          <div className="mx-3 border-[3px] border-gray border-r-darkCreambg animate-spin rounded-full h-8 w-8" />
          <p className="text-msgSize text-gray">Loading</p>
        </div>
      );
    } else {
      // # result page
      return (
        <div className="flex flex-col h-screen w-full items-center overflow-scroll">
          {searchResult.status === "failure" ? (
            <FailureView />
          ) : (
            <div>
              <u>
                {searchResult.number} results of {searchResult.totalResults}
              </u>
              <div className="grid gap-4 grid-cols-3">
                {searchResult.results.map((k) => (
                  <div className="border-2 rounded-md h-40 flex flex-row">
                    <img
                      src={k.image}
                      alt="not aviable"
                      className="w-40 h-36 self-center rounded-3xl"
                    />
                    <div className="flex flex-col mt-5">
                      <div className="flex flex-row">
                        <p className="mr-2 font-nunito font-semibold text-orange">
                          Title:
                        </p>
                        {k.title}
                      </div>
                      <div>
                        <p className="mr-2 font-nunito font-semibold text-orange">
                          Time:
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-row justify-between w-full h-full mt-4">
      {/* filter option side bar */}
      <div className="w-1/3 border-r-4 border-lightGray h-full">
        <p className="text-center font-kanit text-darkOrange underline text-[27px]">
          FILTER OPTIONS
        </p>
        <FilterTab />
      </div>
      <div className="flex flex-col w-3/4">
        {/* searching bar space  */}
        <div className="flex flex-auto flex-col h-1/6 items-center">
          <form onSubmit={Sumbit} className="my-8 w-3/4 flex flex-row">
            <input
              className={styles.searchBar + " w-10/12 h-12 text-2xl"}
              type="text"
              placeholder="Search your recipe..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className={styles.searchBut + " h-12 w-24"}
              type="submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="fill-darkCreambg stroke-2"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />{" "}
              </svg>
            </button>
          </form>
        </div>
        {/* results view */}
        <div className="h-5/6">{searchResult ? <ResView /> : <></>}</div>
      </div>
      <div className="flex flex-col items-center mx-5 justify-self-center"></div>
    </div>
  );
}

export default Searching;
