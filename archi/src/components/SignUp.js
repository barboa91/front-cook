import axios from "axios";
import React, { useState, useEffect } from "react";

const Signup = () => {
  //SetUP State variables for form
  const [pColor, setPColor] = useState("white");
  let [pValue1, setPvalue1] = useState("");
  let [pValue2, setPvalue2] = useState("");
  let [username, setUsername] = useState("");
  let [firstname, setFirstname] = useState("");
  let [lastname, setLastname] = useState("");
  let [privateFlag, setPri] = useState(false);

  let [chefs, setChefs] = useState([]);
  let [userPackage, setUserPackage] = useState({
    username: "",
    firstName: "",
    lastName: "",
    private: false,
    password: "",
  });

  const [APILOADED, setAPILOADED] = useState(false);

  const changeName = (e) => {
    if (e.target.name === "fname") {
      setFirstname(e.target.value);
    }
    if (e.target.name === "lname") {
      setLastname(e.target.value);
    }
    if (e.target.name === "username") {
      setUsername(e.target.value);
    }
  };

  const checkPass = () => {
    if (pValue1 !== pValue2) {
      setPColor("red");
    } else {
      setPColor("white");
    }
  };

  const setPass = (e) => {
    if (e.target.name === "pass") {
      setPvalue1(e.target.value);
    }
    if (e.target.name === "pcheck") {
      setPvalue2(e.target.value);
    }
    checkPass();
  };

  const setupJson = () => {
    let userPack = {
      username: username,
      firstName: firstname,
      lastName: lastname,
      private: privateFlag === "on" ? true : false,
      password: pValue1,
    };
    setUserPackage(userPack);
  };

  const loadAPI = () => {
    !APILOADED ? apiCall() : setAPILOADED(true);
  };

  const checkAndSend = async () => {
    //check if the user name is taken

    let sameName = chefs.find((e) => username === e.username);
    if (sameName) {
      alert("try a different username");
      return;
    }
    //compare the password
    if (pValue1 === pValue2) {
      let n = await axios.post(
        "http://127.0.0.1:3001/api/createChef",
        userPackage
      );
      console.log(n);
      alert(`Welcome ${firstname}`);
    }
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
    checkPass();
    setupJson();
    loadAPI();
  }, [pValue1, pValue2, username, firstname, lastname, privateFlag, username]);
  return (
    <div className="signUp">
      <input
        type="text"
        id="username"
        name="username"
        placeholder="User Name"
        value={username}
        onChange={(e) => changeName(e)}
      />
      <br />
      <input
        type="text"
        placeholder="First name"
        name="fname"
        value={firstname}
        onChange={(e) => changeName(e)}
      />
      <br />
      <input
        type="text"
        placeholder="Last name"
        name="lname"
        value={lastname}
        onChange={(e) => changeName(e)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        name="pass"
        style={{ backgroundColor: pColor }}
        value={pValue1}
        onChange={(e) => setPass(e)}
      />
      <br />
      <input
        type="password"
        placeholder="Password check"
        name="pcheck"
        style={{ backgroundColor: pColor }}
        value={pValue2}
        onChange={(e) => setPass(e)}
      />
      <br />
      Private :{" "}
      <input
        type="checkbox"
        name="private"
        onChange={(e) => setPri(e.target.value)}
      />
      <br />
      <div></div>
      <button onClick={() => checkAndSend()}>Join</button>
    </div>
  );
};

export default Signup;

