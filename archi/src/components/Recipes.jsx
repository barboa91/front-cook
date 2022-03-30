import React, { useState, useEffect } from "react";
import axios from "axios";

const Recipes = () =>{
    //STATE
  const [APILOADED, setAPILOADED] = useState(false);
  let [recipes, setRecipies] = useState([]);
  let [chefs, setChefs] = useState([]);

  const chefData = (chefid)=>{
    const findChefName = chefi => chefs.find(chef => chef.username === chefi);
    const x = findChefName(chefid)
    return (x.firstName+" "+x.lastName)
  }

  const apiCall = async () => {
    try {
        let x = await axios("http://127.0.0.1:3001/api/recipe/all");// Get all of the recipes
        setRecipies(x.data.recipes);
        console.log("Loaded Recipes")
        let c = await axios("http://127.0.0.1:3001/api/chef/all");
        setChefs(c.data.chefs);
        console.log("Loaded Chefs")

        setAPILOADED(true)
      } catch (err) {
        console.log(err);
      }
      
  }
  const loadAPI = () => {
    !APILOADED ? apiCall() : setAPILOADED(true);
  };
  useEffect(() => {
    loadAPI();
  },[]);
  if(!APILOADED){
    return(
    <p>LOADING</p>
    )
  }else
  return(
    <div>
      {recipes.map((r,index) =>{
        return(
          <div key={index} className="recipeBlock"> 
            <div className="recipeName">{r.name}</div>
            {r.pictures.length < 1 && <img alt="recipe" href={r.pictures}></img>} {/* if the there are no pictures, dont display */}
            <ul className="ingredients">{r.ingredients.map((i,index)=>{            //loop through ingredients
              return(<li key={index} className="ing">{i.amount} {i.name}</li>)
            })}</ul>
            <ul className="rSteps">{r.steps.map((s,index)=>{            //loop through ingredients
              return(<li key={index} className="rStep">{s.description}</li>)
            })}</ul>
            {r.comments.length < 1 && <div className="rComments" href={r.comments}></div>} {/* if the there are no pictures, dont display */}
            {chefData(r.chef)}
            <h6>{r.date}</h6>
            <button>DELETE</button>
          </div>
        )
      })}


      {console.log(recipes)}
    </div>
  )
}

export default Recipes