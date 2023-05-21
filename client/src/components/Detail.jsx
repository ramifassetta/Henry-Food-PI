import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const URL = `http://localhost:3001/recipes`;

export const Detail = () => {
  const {id} = useParams();

  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    axios(`${URL}/${id}`)
    .then(({data}) => {
      if(data.name){
        setRecipe(data);
      } else {
        window.alert(`No recipe with id: ${id}`);
      }
    }) 
    return () => setRecipe({});
  }, [id]);

  return (
    <div>
      { recipe.name && <h2>NAME: {recipe.name}</h2> }
      <img src={recipe.image} alt="" />
      { recipe.dishTypes && <h2>DISH TYPE: {recipe.dishTypes}</h2>}
      { recipe.dietTypes && <h2>DIET TYPE: {recipe.dietTypes}</h2> }
      <h2>SUMMARY:</h2>
      { recipe.summary && <p> {recipe.summary?.replace(/(<([^>]+)>)/ig," ")}</p> }
      { recipe.healthScore && <h2>HEALTH SCORE: {recipe.healthScore}</h2> }
      <h2>STEPS:</h2>
      <ul> {Array.isArray(recipe.steps) ? recipe.steps.map(step => {
        return(
          <li key={step.number}>{step.step}</li>
        )
      }) : 
      <li>{recipe.steps}</li>
      }</ul>

      <NavLink to="/home"><button>Back To Recipes</button></NavLink>
    </div>
  )
}
