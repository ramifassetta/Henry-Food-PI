const { Router } = require('express');
const { createRecipe } = require('../controllers/createRecipe');
const { getAllRecipes } = require('../controllers/getAllRecipes');
const { getApiById } = require('../controllers/getApiById');
const { getDbById } = require('../controllers/getDbById');
const { getDiets } = require('../controllers/getDiets');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes/:id", async(req, res) => { 
    try {
        const {id} = req.params;
        //verifico con esta regex si el id cumple con los requisitos uuid de la receta en la db:
        if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
            let dbRecipesById = await getDbById(id);
            return res.status(200).json(dbRecipesById)
        } else {
            let apiRecipesById = await getApiById(id);
            if(apiRecipesById.data.id) {
                let recipeDetails = {
                    id: apiRecipesById.data.id,
                    image: apiRecipesById.data.image,
                    name: apiRecipesById.data.title,
                    dishTypes: apiRecipesById.data.dishTypes,
                    dietTypes: apiRecipesById.data.diets,
                    summary: apiRecipesById.data.summary,
                    healthScore: apiRecipesById.data.healthScore,
                    steps: apiRecipesById.data.analyzedInstructions[0]?.steps.map(e => {
                        return {
                            number: e.number,
                            step: e.step
                        }
                    })
                }
                return res.status(200).json(recipeDetails);
            }
        }
    } catch (error) {
        res.status(404).send("Recipe not found");
    }
});

router.get("/recipes", async(req, res) => { 
    try {
        const {name} = req.query;
        let allRecipes = await getAllRecipes();

        if (name) {
            let recipeByName = await allRecipes.filter((e) => e.name.toLowerCase().includes(name.toString().toLowerCase()));

            if (recipeByName.length) {
                let recipes = recipeByName.map((e) => {
                    return {
                        image: e.image,
                        name: e.name,
                        dietTypes: e.dietTypes ? e.dietTypes : e.diets.map((d) => d.name),
                        score: e.score,
                        id: e.id
                    }
                })
                return res.status(200).send(recipes); 
            }
            return res.status(404).send('Sorry, recipe not found')
        } else {
            let recipes = allRecipes.map((e) => {
                return {
                    image: e.image,
                    name: e.name,
                    dietTypes: e.dietTypes ? e.dietTypes : e.diets.map((d) => d.name),
                    score: e.score,
                    id: e.id
                }
            })
            return res.status(200).send(recipes);
        }
    } catch (error) {
        res.status(404).json({error: error.message})
    }
});

router.post("/recipes", async(req, res) => { 
    try {
        const {name, summary, healthScore, steps,image, dietTypes  } = req.body;
        const recipeData = {
            name,
            summary,
            healthScore,
            steps,
            dietTypes,
            image
        }; 

        const newRecipe = await createRecipe(recipeData);

        return res.status(200).json({ message: "Recipe created successfully", newRecipe})
    } catch (error) {
        console.log(error)
        res.status(404).json("Invalid Recipe");
    }
});

router.get("/diets", async(req, res) => { 
    try {
        const diets = await getDiets();
        return res.status(200).json(diets);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
});

module.exports = router;
