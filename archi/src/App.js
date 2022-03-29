// import logo from './chefs-hat.svg';
import './App.css';
import { useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import DataContext from  './components/DataContext';
import Nav  from './components/Nav'
import Signup from './components/SignUp';
import ComponentA from './components/ComponentA';
import ComponentB from './components/ComponentB';
import Recipes from './components/Recipes';


function App() {
  const [chefInfo, setChefInfo] = useState({
    name:'Alex',
    favorite:'potato'
  })


  return (
    <div className="App">
      <header className="Nav">
        <Nav/>
      </header>
      <main>
        <Routes>
          <Route path="/signup" element={ <Signup/> } />
          <Route path="/recipes" element={ <Recipes/> } />
          


        </Routes>
        <DataContext.Provider value={{ chefInfo, setChefInfo}}>
          <h1>components</h1>
          <ComponentA/>
          <ComponentB/>
        </DataContext.Provider>

      </main>

    </div>
  );
}

export default App;
