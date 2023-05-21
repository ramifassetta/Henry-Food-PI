const axios = require("axios");
const { API_KEY } = process.env

const getApiInfo = async() => {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

    const apiInfo = await response.data.results.map(info => {
        return {
            id: info.id,
            image: info.image,
            name: info.title,
            dietTypes: info.diets,
            summary: info.summary,
            score: info.spoonacularScore,
            healthScore: info.healthScore,
            dishTypes: info.dishTypes,
            steps: info.analyzedInstructions[0]?.steps.map((e) => {
                return {
                    number: e.number,
                    step: e.step
                }
            })
        }
    });

    return apiInfo;
}

module.exports = {
    getApiInfo
}