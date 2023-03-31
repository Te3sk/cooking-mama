import React from "react";
import { Link } from "react-router-dom";

function SideBar() {

  return (
    <div className="bg-[#000000] text-[#ffffff] absolute w-2/6">
      <ul>
        <li>
          <Link to="/complex-search"> Search recipe </Link>
        </li>
        <li>
        <Link to="/random"> Get a random recipe </Link>
        </li>
      </ul>
    </div>
  );
}
export default SideBar;
