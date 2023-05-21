import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import { Landing } from "./components/Landing";
import { Nav } from './components/Nav';
import Cards from './components/Cards';
import { Detail } from "./components/Detail";
import { Form } from "./components/Form";
import { useState } from 'react';
import axios from "axios";

const URL = `http://localhost:3001/recipes`;

function App() {
  //location para la nav
  const location = useLocation();
  const showNav = location.pathname !== '/';

  //state donde almaceno las recetas
  const [recipes, setRecipes] = useState([]);

  //Funciones Buscar y Cerrar
  const onSearch = async(id) => {
    try {
      const response = await axios.get(`${URL}/${id}`);
      const data = response.data; 
  
      if(data.name){
        setRecipes((oldRecipes)=> [...oldRecipes, data]);
      }
      
    } catch (error) {
      alert(`Cant found a Recipe with ID: ${id}`);
    }
  }

  const onClose = (id) => {
    const recipeFiltered = recipes.filter(recipe => recipe.id !== id);
    setRecipes(recipeFiltered);
    console.log(id);
  }

 

  return (
    
    <div className="App">
      {showNav && <Nav onSearch={onSearch} />} 

      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/home" element={<Cards recipes={recipes} onClose={onClose}/>}/>
        <Route path="/detail/:id" element={<Detail />}/>
        <Route path="/create" element={<Form />}/>
      </Routes>
    </div>
  );
}

export default App;
