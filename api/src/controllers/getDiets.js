const { Diets } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env

const getDiets = async() => {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);
    const diets = [];

    response.data.results.forEach((recipe) => {
        if (recipe.diets && Array.isArray(recipe.diets)) {
            diets.push(...recipe.diets);
        }
    });

    diets.forEach(e => {
        Diets.findOrCreate({
            where: { name: e}
        })
    });
    const dietTypes = await Diets.findAll();

    return dietTypes;
}

module.exports = {
    getDiets
}