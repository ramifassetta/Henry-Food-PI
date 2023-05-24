import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../css/Detail.css"


const URL = `http://localhost:3001/recipes`;

export const Detail = () => {
  const {id} = useParams();
  const {name} = useParams()

  const [recipe, setRecipe] = useState([]);
  const allRecipes = useSelector((state) => state.allRecipes);
  console.log(allRecipes);

  useEffect(() => {
    const userRecipe = allRecipes.find((recipe) => recipe.name === name);
    if (userRecipe) {
      setRecipe(userRecipe);
    } else {
      axios(`${URL}/${id}`)
        .then(({ data }) => {
          if (data.name) {
            setRecipe(data);
          } else {
            window.alert(`No recipe with id or name: ${id}`);
          }
        })
        .catch((error) => {
          console.log(error);
          window.alert(`Error fetching recipe with id or name: ${id}`);
        });
    }
  }, [id, allRecipes]);

  return (
    <div className="container">
      <div>
        { recipe.name && <h2 className="detailName">NAME: {recipe.name}</h2> }
        <img src={recipe.image} alt="" className="detailImage"/>
        { recipe.dishTypes && <h2 className="detailDish">DISH TYPE: {recipe.dishTypes.join(", ")}</h2>}
        { recipe.dietTypes && <h2 className="detailDiet">DIET TYPE: {recipe.dietTypes.join(", ")}</h2> }
        { recipe.healthScore && <h2 className="detailScore">HEALTH SCORE: {recipe.healthScore}</h2> }
      </div>
      <div className="detailSummary">
        <h2>SUMMARY:</h2>
        { recipe.summary && <p> {recipe.summary?.replace(/(<([^>]+)>)/ig," ")}</p> }
      </div>
      <div className="detailSteps">
        <h2>STEPS:</h2>
        <ul> {Array.isArray(recipe.steps) ? recipe.steps.map(step => {
          return(
            <li key={step.number}>{step.step}</li>
          )
        }) : 
        <li>{recipe.steps}</li>
        }</ul>

      </div>
        <NavLink to="/home"><button className="backToRecipes">Go back to Recipes</button></NavLink>
    </div>
  )
}
