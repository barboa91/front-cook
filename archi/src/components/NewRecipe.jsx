import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import DataContext from "./DataContext";

const NewRecipe = () =>{
    const [APILOADED, setAPILOADED] = useState(false);
    const { chefInfo, setChefInfo } = useContext(DataContext)
    const [recipePackage, setRecipePackage] = useState({
        ingredients:[""],
        steps:[""]
    })


    const changArr = (e, index) =>{
        const nValue = e.target.value;
        const prevValue = {...recipePackage}
        prevValue.ingredients[index] = nValue

        setRecipePackage(prevValue)
    }

    const pushIng = () =>{
        const pushArr = {...recipePackage}
        pushArr.ingredients.push("")
        setRecipePackage(pushArr)
    }


    const apiCall = async () => {
        try {
            let n = await axios.post("http://127.0.0.1:3001/api/createRecipe", recipePackage);
              console.log(n);
        } catch (err) {
          console.log(err);
        }
      };
      useEffect(() => {

      },[])

    return(
        <div className="newRecipe">
            <input type="text" placeholder="Recipe Name" name="rName" value={recipePackage.name} onChange={(e) => setRecipePackage({ ...recipePackage , name: e.target.value})}/><br/>

            {recipePackage.ingredients.map((i,index)=>(
                <div className="addIngredient"><input type="text" placeholder="Ingredient" value={i} onChange={e=>changArr(e, index)}></input>
                <span><button onClick={()=>pushIng()} style={{borderRadius:100}}>+</button></span></div>
            ))}



        <div>{recipePackage.name}</div>

        <button>ADD RECIPE</button>
        </div>
    )
}

export default NewRecipe