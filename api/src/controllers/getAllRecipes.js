const { getApiInfo } = require("./getApiInfo");
const { getDbInfo } = require("./getDbInfo");

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const totalInfo = apiInfo.concat(dbInfo);

    return totalInfo;
}

module.exports = {
    getAllRecipes
}