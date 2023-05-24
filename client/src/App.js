import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import { Landing } from "./components/Landing";
import { Nav } from './components/Nav';
import Cards from './components/Cards';
import { Detail } from "./components/Detail";
import { Form } from "./components/Form";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { closeRecipe, addRecipes } from './redux/actions';

const URL = `http://localhost:3001/recipes`;

function App() {
  const dispatch = useDispatch();

  const location = useLocation();
  const showNav = location.pathname !== '/';

  //Funciones Buscar y Cerrar
  const onSearch = async (id) => {
    try {
      const response = await axios.get(`${URL}/${id}`);
      const data = response.data;
  
      if (data && data.name) {
        dispatch(addRecipes(data, data));
      } else {
        alert(`Recipe not found with ID: ${id}`);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onClose = (name) => {
    dispatch(closeRecipe(name));
  }

  return (
    
    <div className="App">
      {showNav && <Nav onSearch={onSearch} />} 

      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/home" element={<Cards  onClose={onClose}/>}/>
        <Route path="/detail/:name" element={<Detail />}/>
        <Route path="/create" element={<Form />}/>
      </Routes>
    </div>
  );
}

export default App;
