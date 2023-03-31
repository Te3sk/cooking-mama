import React, { useState } from 'react';
// * import pages files
import Searcing from './components/recipes/Searcing';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import RandomRecipes from './components/recipes/RandomRecipes';


function PageSelector() {
    const [subPage, setSubPage] = useState("home");

    const Selector = () => {
        switch (subPage) {
            case "home":
                return <p>HOME</p>;
            case "search":
                return <Searcing />;
            case "auth":
                return (
                    <div>
                        <SignIn /> <SignUp />
                    </div>
                );
            case "random":
                return <RandomRecipes />
        }
    };

    return Selector();
}

export default PageSelector;