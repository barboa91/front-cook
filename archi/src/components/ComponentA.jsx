import React, { useContext } from "react";
import { DataContext } from './DataContext'

const ComponentA = () =>{
    const {chefInfo , setChefInfo} = useContext(DataContext)


    return(
        <div>
            <div> Name {chefInfo.name} </div>
            <div> Favorite Vegetable {chefInfo.favorite} </div>
            <div> <span style={{color : chefInfo.favColor}} >Name {chefInfo.name} </span></div>
        
        <button onClick= {()=>{
            setChefInfo({
                ...chefInfo,
                favColor: "green"
            })
        }}>CLICK ME</button>
        
        
        </div>
        
    )
}

export default ComponentA