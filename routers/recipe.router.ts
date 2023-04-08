import {Router} from "express";
import {RecipeEntity} from "../types";
import {RecipeRecord} from "../records/recipe.record";
import {ValidationError} from "../utils/error";

export const recipeRouter = Router();

recipeRouter
    .get('/listAll', async (req, res) => {
        const recipes: RecipeEntity[] = await RecipeRecord.getAll();
        res.json(recipes);
    })
    .get('/listLatestWeek', async (req, res) => {
        const recipes: RecipeEntity[] = await RecipeRecord.getLastWeek();
        res.json(recipes);
    })
    .get('/getDateRange/:firstDate/:secondDate', async (req, res) => {
        const recipes: RecipeEntity[] = await RecipeRecord.getDateRange(req.params.firstDate, req.params.secondDate);
        res.json(recipes);
    })
    .post('/', async (req, res) => {
        const newRecipe = await RecipeRecord.insertToDb(req.body);
        console.log(req.body);
        res.json(newRecipe);

    })
    .delete('/:id', async (req, res) => {
        const deleteRecipe = await RecipeRecord.deleteFromDb(req.params.id);
        if (!deleteRecipe) {
            throw new ValidationError(`No recipe with id ${req.params.id}`);
        }
        res.json(deleteRecipe);
    })

// @todo stworzyć dla newRecipe typy, router, rekord --> odrębny byt i dać const newRecipeRecord = new NewRecipeRecord         newRecipeRecord.insert()

// .get('/:id', async (req, res) => {
//     const ad: AdEntity = await AdRecord.getOne(req.params.id);
//     res.json(ad);
// })
//
// .post('/', async (req, res) => {
//     const ad = new AdRecord(req.body);
//     await ad.insert();
//     res.json(ad);
//
// });

