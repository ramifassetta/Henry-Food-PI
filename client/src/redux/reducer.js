import { FILTER, ALPHABETICAL_ORDER, SCORE_ORDER, ADD_RECIPES, SET_RECIPES, CLOSE_RECIPE, FILTER_SOURCE, REFRESH_RECIPES } from "./actions-types"

const initialState = {
    recipes: [],
    allRecipes: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FILTER:
            const filterOrder = state.allRecipes.filter(recipe => recipe.dietTypes?.some(d => d.toLowerCase()  === action.payload.toLowerCase()))
            return{
                ...state,
                recipes: state.allRecipes,
                allRecipes: filterOrder,
            }
        case FILTER_SOURCE:
            let recipeSource;
            if (action.payload === "all") {
              recipeSource = state.allRecipes;
            }
            if (action.payload === "default") {
              recipeSource = state.allRecipes.filter((r) => r.dishTypes);
            }
            if (action.payload === "created") {
              recipeSource = state.allRecipes.filter((r) => !r.dishTypes);
            }
            return {
              ...state,
              allRecipes: recipeSource
            };
        case ALPHABETICAL_ORDER:
            let recipeSort = [...state.allRecipes ]
            if(action.payload === "A"){
                recipeSort.sort((recA, recB) => recA.name.localeCompare(recB.name))
            }
            if(action.payload === "D"){
                recipeSort.sort((recA, recB) => recB.name.localeCompare(recA.name))
            }
            return{
                ...state,
                allRecipes: recipeSort
            }
        case SCORE_ORDER:
            let scoreSort = [...state.allRecipes]
            if (action.payload === "A") {
                scoreSort.sort((recA, recB) => recA.healthScore - recB.healthScore);
            }
            if (action.payload === "D") {
                scoreSort.sort((recA, recB) => recB.healthScore - recA.healthScore);
            }
            return {
                ...state,
                allRecipes: scoreSort
            };
        case ADD_RECIPES:
            const { recipeData } = action.payload;
            return{
                ...state,
                recipes: [...state.recipes, recipeData],
                allRecipes: [...state.allRecipes, recipeData ]
            }
        case SET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            };
        case CLOSE_RECIPE:
            const filteredRecipes = state.allRecipes.filter(recipe => recipe.name !== action.payload);
            return {
                ...state,
                allRecipes: filteredRecipes
            };
        case REFRESH_RECIPES:
            return {
                ...state,
                allRecipes: state.recipes.slice()
            };
        default:
            return{ ...state }
    };
};

export default reducer;

