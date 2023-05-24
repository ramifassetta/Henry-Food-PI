export const validation = (data, existingRecipes) => {
    const errors = {}
    if(!/^https?:\/\/(?:www\.)?.+\.(?:jpg|jpeg|png|gif|bmp|svg)$/i.test(data.image)) errors.image = "please insert a valid image URL"
    if(!data.name){
        errors.name = "you must create a name for your recipe"
    } else {
        const recipeExists = existingRecipes.some(recipe => recipe.name.toLowerCase() === data.name.toLowerCase());
        if (recipeExists) {
          errors.name = "Ya existe una receta con el mismo nombre";
        }
    }
    if(!data.summary) errors.summary = "you need a summary for your recipe"
    if(data.healthScore === 1 || data.healthScore > 100) errors.healthScore = "please choose a number between 1 and 100"

    return errors;
};

