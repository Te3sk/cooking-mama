const filterop = {
  cousine: {
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
    // // * return rendering of all the cousines as a checklist
    // checklist : function () {
    //     return (
    //         <div>
    //             <ul>
    //                 {this.listOfCousine.map((x, index) => {
    //                     return(
    //                         <li key={index} className="flex flex-row justify-between">
    //                             <p className="ml-2">{x}</p>
    //                             <div className="flex flex-row">
    //                                 <button className="border-2">include</button>
    //                                 <button className="border-2">exclude</button>
    //                             </div>
    //                         </li>
    //                     );
    //                 })}
    //             </ul>
    //         </div>
    //     );
    // },
  },
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

export default filterop;
