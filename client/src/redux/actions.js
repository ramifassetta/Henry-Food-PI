import { FILTER, ALPHABETICAL_ORDER, SCORE_ORDER, ADD_RECIPES, SET_RECIPES, CLOSE_RECIPE, FILTER_SOURCE, REFRESH_RECIPES } from "./actions-types";

export const filterRecipe = (diet) => {
    return{type: FILTER, payload: diet}
}

export const alphabeticalOrderRecipe = (order) => {
    return{type: ALPHABETICAL_ORDER, payload: order}
}

export const scoreOrderRecipe = (order) => {
    return{type: SCORE_ORDER, payload: order}
}

export const addRecipes = (recipe, recipeData) => {
    return{type: ADD_RECIPES, payload: {recipe, recipeData}}
}

export const setGlobalRecipes = (recipes) => {
    return {type: SET_RECIPES, payload: recipes,};
};

export const closeRecipe = (name) => {
    return {type: CLOSE_RECIPE, payload: name};
};

export const filterSourceRecipe = (payload) => {
    return{type: FILTER_SOURCE, payload: payload}
};

export const refreshRecipes = () => {
    return{type: REFRESH_RECIPES}
};
