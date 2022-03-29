import React, { useContext } from "react";
import DataContext from "./DataContext";

const ComponentB = () =>{
    const {chefInfo} = useContext(DataContext)
    return(
        <div> Some stuff
            <div>{chefInfo.name}</div>



        </div>
    )
}

export default ComponentB