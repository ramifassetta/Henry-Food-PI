import React, { useState } from 'react'
import { Card } from './Card'
import { connect, useDispatch, useSelector } from 'react-redux';
import { filterRecipe, alphabeticalOrderRecipe, scoreOrderRecipe, refreshRecipes, filterSourceRecipe } from '../redux/actions';
import "../css/Cards.css";

const Cards = (props) => {
  const recipes = useSelector((state) => state.allRecipes);

  console.log("Datos de la receta creada:", recipes);
  //defino recetas por pagina y estados de la pagina y currentPage
  const RECIPES_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState(0);

  // Funciones Next y Prev del Paginado
  const nextHandler = () => {
    const totalPages = Math.ceil(recipes.length / RECIPES_PER_PAGE);
    const nextPage = currentPage + 1;
    
    if (nextPage >= totalPages) return;

    setCurrentPage(nextPage);
  };

  const prevHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;

    setCurrentPage(prevPage);
  };

  const startIndex = currentPage * RECIPES_PER_PAGE;
  const endIndex = startIndex + RECIPES_PER_PAGE;
  const recipesToShow = recipes.slice(startIndex, endIndex);

  //dispatch de actions y estado aux del order y filter
  const [aux, setAux] = useState(false);

  const dispatch = useDispatch();

  const handleRefresh = () => {
    if (recipes.length > 0) {
      dispatch(refreshRecipes());
    }
    setCurrentPage(0);
  };

  const handlerAlphabeticalOrder = (event) => {
    dispatch(alphabeticalOrderRecipe(event.target.value))
    setAux(true);
    console.log(event.target.value);
  }

  const handlerScoreOrder = (event) => {
    dispatch(scoreOrderRecipe(event.target.value))
    setAux(true);
    console.log(event.target.value);
  }

  const handlerFilter = (event) => {
    event.preventDefault()
    dispatch(filterRecipe(event.target.value));
    console.log(event.target.value);
  }

  const handlerSourceFilter = (event) => {
    event.preventDefault()
    dispatch(filterSourceRecipe(event.target.value))
    setCurrentPage(0)
  }
  console.log(recipesToShow);

  return (
    <div className='scroll'>
      <div className='ordersYfilters'>
        <button onClick={handleRefresh}>Refresh</button>
        <label className='filters'>Order:</label>
        <select className='select' name="alphabetical" onChange={handlerAlphabeticalOrder}>
          <option disabled defaultValue>Alphabetical</option>
          <option value="A">Ascend</option>
          <option value="D">Descend</option>
        </select>
        <select className='select' name="numerical" onChange={handlerScoreOrder}>
          <option disabled defaultValue>Health Score</option>
          <option value="A">Ascend</option>
          <option value="D">Descend</option>
        </select>

        <label className='filters'>Diet Types:</label>
        <select className='select' name="diets" onChange={handlerFilter}>
          <option disabled defaultValue>Select...</option>
          <option value="gluten free">Gluten Free</option>
          <option value="dairy free">Dairy Free</option>
          <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>  
          <option value="vegan">Vegan</option>
          <option value="primal">Primal</option>
          <option value="paleolithic">Paleolithic</option>
          <option value="whole 30">Whole 30</option>
        </select>

        <label className='filters'>Sources:</label>
        <select className='select' name="diets" onChange={handlerSourceFilter}>
          <option disabled defaultValue>Select...</option>
          <option value="all">All Recipes</option>
          <option value="default">Recipes Brought</option>
          <option value="created">Created Recipes</option>  
        </select>
      </div>
      <div className='centro'> 
        <div className='pos'> 
          <button onClick={prevHandler} className='botones'>Prev</button>
          <div className='page-number'>
            <h1>Page: {currentPage}</h1>
          </div>
          <button onClick={nextHandler} className='botones'>Next</button>
        </div>
      </div>
      
      {
        recipesToShow.map(recipe => (
          <Card
            key={recipe.id}
            id={recipe.id}
            name={recipe.name}
            dishTypes={recipe.dishTypes}
            dietTypes={recipe.dietTypes }          
            summary={recipe.summary}       
            healthScore={recipe.healthScore}
            steps={recipe.steps}
            image={recipe.image}
            onClose={props.onClose} 
          />
        ))
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    allRecipes: state.allRecipes,
    recipes: state.recipes
  }
}

export default connect(
  mapStateToProps,
  null
) (Cards)
