import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DataContext from "./DataContext";

const Nav = () =>{
    const { chefInfo, setChefInfo } = useContext(DataContext)
    
    return(
        <div className="navigationbar">
            <Link to="/"> Home </Link>
            {!chefInfo.loggedIn && <Link to="/signup"> Sign Up </Link>}
            {!chefInfo.loggedIn && <Link to="/login"> Log In </Link>}
            {chefInfo.loggedIn && <span>{chefInfo.username}</span>}
            {chefInfo.loggedIn && <Link to="/logout" onClick={()=>setChefInfo({loggedIn:false})}> Log Out </Link>}

            <Link to="/recipes"> Recipies </Link>

        </div>
    )
}

export default Nav