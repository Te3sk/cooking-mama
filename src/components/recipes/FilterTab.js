const FilterTab = () => {
    // * current sub-filter-tab
    const [currentChoice, setCurrentChoice] = useState(null);
   // TODO- include ingredients

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