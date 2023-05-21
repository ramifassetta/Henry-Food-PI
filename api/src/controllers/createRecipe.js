const { Recipe, Diets } = require("../db");

const createRecipe = async(recipeData) => {
    const { name, summary, image, healthScore, steps, dietTypes } = recipeData;

    const existingRecipe = await Recipe.findOne({ where: { name } });
    if (existingRecipe) {
      throw new Error(`La receta ${name} ya existe.`);
    }
 
    const newRecipe = await Recipe.create({
        name,
        summary,
        image,
        healthScore,
        steps,
    });

    let dietTypesRecipeDb = await Diets.findAll({
        where: {name: dietTypes}
    })
    newRecipe.addDiets(dietTypesRecipeDb)

    return newRecipe;
}

module.exports = {
    createRecipe
}