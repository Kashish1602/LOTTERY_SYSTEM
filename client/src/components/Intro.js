import React from "react";
import { NavLink } from "react-router-dom";
const Intro = () => {
  return (
      <>
    <div className="text-uppercase my-4">
    <h1 className="text-info">are you </h1>
    <br/>
    <div className="d-flex justify-content-evenly">
           <NavLink to="/manager">
            <button className="my-2 px-4 text-white text-uppercase fs-3 border border-info rounded-pill bg-dark">Manager</button>
           </NavLink>
           <NavLink to="/players">
            <button className="my-2 px-4 text-white text-uppercase fs-3 border border-info rounded-pill bg-dark">Player</button>
           </NavLink>
    </div>
           
    </div>
           </>

  );
};

export default Intro;
