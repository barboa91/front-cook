import { render } from "@testing-library/react";
import axios from "axios";
import React, { useState, useEffect } from "react";


const Signup = () => {

    //SetUP State variables for form
    const [pColor, setPColor] = useState("white")
    let [pValue1, setPvalue1] = useState("")
    let [pValue2, setPvalue2] = useState("")
    let [username, setUsername] = useState("")
    let [firstname, setFirstname] = useState("")
    let [lastname, setLastname] = useState("")
    let [chefs, setChefs] = useState([])


    const changeName = (e) =>{
        
    }



    const checkPass = () =>{
        console.log("Inside the check",pValue1,pValue2)
        if(pValue1 !== pValue2){
            setPColor("red")
        }else{
            setPColor("white")
        }
    }
    const setPass = (e) =>{
        if(e.target.name === "pass"){
            setPvalue1(e.target.value)
        }
        if(e.target.name === "pcheck"){
            setPvalue2(e.target.value)
        }
        render()
        checkPass()
    }

    const checkAndSend = () =>{
        //check if the user name is taken
        apiCall()

        let un = document.getElementById("username")
        let unv = un.value
        setUsername(unv)

        let sameName = chefs.find((e)=>username === e.username) 
        sameName ? alert("SAME NAME") : console.log("new name")
        //compare the password
        if(pValue1 === pValue2){
            alert("good to send")
        }
    }

    const apiCall = async () =>{
        try{
            let x = await axios("http://127.0.0.1:3001/api/chef/all")
            setChefs(x.data.chefs)
           // console.log(x.data.chefs)
        }catch(err) {
            console.log(err)
          }
        }
    useEffect(()=>{
        checkPass()


    },[pValue1,pValue2])
  return (
    <div className="signUp">
      <input
        type="text"
        id="username"
        name="username"
        placeholder="User Name"
      />
      <br />
      <input type="text" placeholder="First name" name="fname" value={firstname} onChange={(e)=> changeName(e)}/>
      <br />
      <input type="text" placeholder="Last name" name="lname" value={lastname} onChange={(e)=> changeName(e)}/>
      <br />
      <input type="text" placeholder="Password" name="pass" style={{backgroundColor:pColor}} value={pValue1} onChange={(e) => setPass(e)}/>
      <br />
      <input type="text" placeholder="Password check" name="pcheck" style={{backgroundColor:pColor}}value={pValue2} onChange={(e)=>setPass(e)}/>
      <br />
      Private : <input type="checkbox" name="private" />
      <br />
      <div></div>
      <button onClick={()=>checkAndSend()}>Join</button>
    </div>
  );
};

export default Signup;
// setPvalue2(e.target.value)}

//setPvalue1(e.target.value)