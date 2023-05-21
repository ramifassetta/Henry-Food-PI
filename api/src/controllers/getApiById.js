const axios = require("axios"); 
const { API_KEY } = process.env; 

const getApiById = async(id) => {
   return await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`)
}

module.exports = {
    getApiById
}