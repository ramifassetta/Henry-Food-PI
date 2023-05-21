import { FILTER, ALPHABETICAL_ORDER, SCORE_ORDER } from "./actions-types";

export const filterRecipe = (diet) => {
    return{type: FILTER, payload: diet}
}

export const alphabeticalOrderRecipe = (order) => {
    return{type: ALPHABETICAL_ORDER, payload: order}
}

export const scoreOrderRecipe = (order) => {
    return{type: SCORE_ORDER, payload: order}
}
