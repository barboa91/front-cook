import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataContext from "./DataContext";

const Login = () =>{
    let [username, setUsername] = useState("");
    let [passW, setPassW] = useState("");
    let [chefs, setChefs] = useState([]);
    const [APILOADED, setAPILOADED] = useState(false);
    const { chefInfo, setChefInfo } = useContext(DataContext)



    const changeName = (e) => {
        if (e.target.name === "username") {
          setUsername(e.target.value);
        }
        if (e.target.name === "pass") {
            setPassW(e.target.value);
          }
    }

    const tryLogin = () =>{

        const findChefUser = chefi => chefs.find(chef => chef.username === chefi);
        let x = findChefUser(username)
        if(!x){
            alert(`User ${username} was not found`)
            return
        }
        console.log(x.password)
        
        
        if(x.password === passW){
                alert("you did it")
                setChefInfo({
                    loggedIn:true,
                    username: x.username,
                    firstName: x.firstName,
                    lastName: x.lastName,
                    profpic: x.profpic,
                    id: x._id
                })
                console.log(chefInfo)
                // let chefI = chefInfo
                // localStorage.setItem('chefI',chefI)
            } else {
                alert("Wrong Password")
                setChefInfo({
                    loggedIn:false
                })
            }

    }

    const loadAPI = () => {
        !APILOADED ? apiCall() : setAPILOADED(true);
      };
    const apiCall = async () => {
        try {
          let x = await axios("http://127.0.0.1:3001/api/chef/all");
          setChefs(x.data.chefs);
          // console.log(x.data.chefs)
        } catch (err) {
          console.log(err);
        }
      };
      useEffect(() => {
        loadAPI();
      },[])
    
      if(chefInfo.loggedIn){
          return (
                        <div>
                            <Link to="/newrecipe"> New Recipe </Link> 

                            <div>Welcome</div>
                        </div>
          )
      } 

    return(
        <div className="login">
        <input
            type="text"
            id="username"
            name="username"
            placeholder="User Name"
            value={username}
            onChange={(e) => changeName(e)}
        />
        <input
        type="password"
        placeholder="Password"
        name="pass"
        value={passW}
        onChange={(e) => changeName(e)}
        />

        <button onClick={()=>tryLogin()}>LOGIN</button>

        </div>
    )


}

export default Login