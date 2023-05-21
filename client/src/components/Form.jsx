import { useEffect, useState } from "react"
import axios from "axios";
import "../css/Forms.css";

const validate = (input) => {
  const errors = {}
  if(!input.image) errors.image = "Please insert a image URL"
  if(!input.name) errors.name = "Please complete with a recipe name";
  if(!input.summary) errors.summary = "Please add some comments about your recipe";
  if(input.healthScore < 1 || input.score > 100) errors.healthScore = "The score must be a number between 1 and 100";
  if(!input.steps.length) errors.steps = "Please detail the steps for your recipe";
  if(!input.dietTypes.length) errors.dietTypes = "You must select at least one diet type";
}

export const Form = () => {

  const URL = `http://localhost:3001/recipes`;
  const URL_DIETS = `http://localhost:3001/diets`;

  const [diets, setDiets] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]); //checkear esto, sino borrar
  const [errors, setErrors] = useState({})

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
    dietTypes: ""
  });
  
  const handleChange = (event) => {
    event.preventDefault();
    setRecipeData((prevData) => {
      const newData = {
        ...prevData,
        [event.target.value]: event.target.value
      }
      const validations = validate(newData);
      setErrors(validations)
      return newData;
    })
  }
  
  const handleSubmit = async(event) => {
    // try {
    //   event.preventDefault();
    //   const response = await axios.post(URL, recipeData);
    //   console.log(response.data); 
    // } catch (error) {
    //   console.error(error); 
    // }
    event.preventDefault();

    if(Object.values(errors).length > 0) {
      alert ("Please complete the information required");
    }
    else if (
      recipeData.image === "" &&
      recipeData.name === "" &&
      recipeData.summary === "" &&
      recipeData.healthScore === "" &&
      recipeData.steps === "" &&
      !recipeData.dietTypes.length){
        alert("Please complete the Form");
      }
    else {
      const response = await axios.post(URL, recipeData);
      alert ("New Recipe added successfully!")
      setRecipeData({
        image: "",
        name: "",
        summary: "",
        healthScore: "",
        steps: [],
        dietTypes: []
      })
    }
  }

  //
    const handleDietChange = (event) => {
      const { value, checked } = event.target;
  
      if (checked) {                                    //checkear esto, sino borrar
        setSelectedDiets([...selectedDiets, value]);
      } else {
        setSelectedDiets(selectedDiets.filter(diet => diet !== value));
      }
    }
  //
  
  console.log(recipeData);
  
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>

        <label htmlFor="image">Image: </label>
        <input type="text" placeholder="image URL" name="image" value={recipeData.image} onChange={handleChange}/> <br />

        <label htmlFor="name">Name: </label>
        <input type="text" name="name" value={recipeData.name} onChange={handleChange}/> <br />

        <label htmlFor="summary">Summary: </label>
        <input type="text" name="summary" value={recipeData.summary} onChange={handleChange}/> <br />
 
        <label htmlFor="healthScore">Health Score: </label>
        <input type="number" name="healthScore" value={recipeData.healthScore} onChange={handleChange}/> <br />

        <label htmlFor="steps">Steps: </label>
        <input type="text" name="steps" value={recipeData.steps} onChange={handleChange}/> <br />

        {/* <label htmlFor="dietTypes">Diet Type: </label>
        <select name="dietTypes" multiple value={recipeData.dietTypes} onChange={handleChange}>
        <option value="" disabled defaultValue>Seleccionar</option>
          {diets.map((diet, index) => (
            <option key={index} value={diet}>{diet}</option>
          ))}
        </select> */}

        <label htmlFor="dietTypes">Diet Types: </label>  {/*CHECKEAR ESTO, SINO BORRAR*/}
        {diets.map((diet, index) => (
          <div key={index}>
            <input type="checkbox" name="dietTypes" value={diet} onChange={handleDietChange} /> 
            <span>{diet}</span>
          </div>
        ))}

        <button>CREATE RECIPE</button>
      </form>
    </div>
  )
}
