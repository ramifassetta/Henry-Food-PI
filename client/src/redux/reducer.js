import { FILTER, ALPHABETICAL_ORDER, SCORE_ORDER } from "./actions-types"

const initialState = {
    allRecipes: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FILTER:
            const filterOrder = state.allRecipes.filter(recipe => recipe.dietTypes?.some(d => d.toLowerCase()  === action.payload.toLowerCase()))
            return{
                ...state,
                allRecipes: filterOrder
            }
        case ALPHABETICAL_ORDER:
            let recipeSort = [...state.allRecipes ]
            if(action.payload === "A"){
                recipeSort.sort((recA, recB) => recA.id - recB.id)
            }
            if(action.payload === "D"){
                recipeSort.sort((recA, recB) => recB.id - recA.id)
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
        default:
            return{...state}
    };
};

export default reducer;

