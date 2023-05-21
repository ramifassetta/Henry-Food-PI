const { Diets, Recipe } = require("../db");

const getDbById = async (id) => {
    return await Recipe.findByPk(id, {
        include: {
            model: Diets,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
}

module.exports = {
    getDbById
}