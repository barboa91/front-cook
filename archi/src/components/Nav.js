import React from "react";
import { Link } from "react-router-dom";


const Nav = () =>{
    return(
        <div className="navigation bar">
            <Link to="/"> Home </Link>
            <Link to="/signup"> Sign Up </Link>
            <Link to="/login"> Log In </Link>
            <Link to="/recipes"> Recipies </Link>

        </div>
    )
}

export default Nav