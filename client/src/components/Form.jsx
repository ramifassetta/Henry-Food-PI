import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { validation } from "../validation";
import { addRecipes } from '../redux/actions';
import axios from "axios";
import "../css/Forms.css";
import { useNavigate } from "react-router-dom";

const URL = `http://localhost:3001/recipes`;
const URL_DIETS = `http://localhost:3001/diets`;

export const Form = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [diets, setDiets] = useState([]);
  const [errors, setErrors] = useState({});

  const existingRecipes = useSelector(state => state.allRecipes);

  //useEffect para traer las dietas cuando se monta el componente
  useEffect(() => {
    const fetchDiets = async () => {
      try {
        const response = await axios.get(URL_DIETS);
        setDiets(response.data.map(diet => diet.name));
      } catch (error) {
        console.error(error);
      }
    };

    fetchDiets();
  }, []);

  const [recipeData, setRecipeData] = useState({
    image: "",
    name: "",
    summary: "",
    healthScore: "",
    steps: "",
    dietTypes: []
  });

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    let updatedValue = value;
  
    if (name === "dietTypes") {
      const diet = value;
  
      if (checked) {
        // Agregar la dieta seleccionada al array de dietTypes en recipeData
        updatedValue = [...recipeData.dietTypes, diet];
      } else {
        // Eliminar la dieta deseleccionada del array de dietTypes en recipeData
        updatedValue = recipeData.dietTypes.filter((item) => item !== diet);
      }
    }
  
    setRecipeData({
      ...recipeData,
      [name]: updatedValue
    });
  
    const updatedErrors = validation(
      {
        ...recipeData,
        [name]: updatedValue
      },
      existingRecipes
    );
    setErrors(updatedErrors);
  };

  const handleSubmit = async(event) => {
      event.preventDefault();
      const formErrors = validation(recipeData, existingRecipes);

      if(Object.keys(formErrors).length === 0){
        try {
          const response = await axios.post(URL, recipeData);
          const newRecipe = response.data;
          dispatch(addRecipes(newRecipe, recipeData)); // Agregar la nueva receta al estado de Redux
          console.log(newRecipe);
          console.log(recipeData);
          alert("Recipe created successfully");
          navigate("/home");
        } catch (error) {
          console.log(error)
          alert("Error creating recipe");
        }
      } else {
        setErrors(formErrors);
      }
  }

  // console.log(recipeData);

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>

        <label htmlFor="image">Image: </label>
        <input type="text" placeholder="image URL" name="image" value={recipeData.image} onChange={handleChange}/>
        {errors.image && <p style={{color:"red"}}>{errors.image}</p>}
        <br /> <br />

        <label htmlFor="name">Name: </label>
        <input type="text" name="name" value={recipeData.name} onChange={handleChange}/>
        {errors.name && <p style={{color:"red"}}>{errors.name}</p>}
        <br /> <br />

        <label htmlFor="summary">Summary: </label>
        <input type="text" name="summary" value={recipeData.summary} onChange={handleChange}/> 
        {errors.summary && <p style={{color:"red"}}>{errors.summary}</p>}
        <br /> <br />
 
        <label htmlFor="healthScore">Health Score: </label>
        <input type="number" name="healthScore" value={recipeData.healthScore} onChange={handleChange}/> 
        {errors.healthScore && <p style={{color:"red"}}>{errors.healthScore}</p>}
        <br /> <br />

        <label htmlFor="steps">Steps: </label>
        <input type="text" name="steps" value={recipeData.steps} onChange={handleChange}/> 
        {errors.steps && <p style={{color:"red"}}>{errors.steps}</p>}
        <br /> <br />

        <label htmlFor="dietTypes">Diet Types: </label> 
        {diets.map((diet, index) => (
          <div key={index}>
            <input type="checkbox" name="dietTypes" value={diet} onChange={handleChange} /> 
            <span className="formSpan">{diet}</span>
          </div>
        ))}
        {errors.dietTypes && <p style={{color:"red"}}>{errors.dietTypes}</p>}
        <br /> 
        <div className="button-container">
          <button type="submit">CREATE RECIPE</button>
        </div>
      </form>
    </div>
  )
}
