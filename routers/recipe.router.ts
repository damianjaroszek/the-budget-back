import {Router} from "express";
import {RecipeEntity} from "../types";
import {RecipeRecord} from "../records/recipe.record";
import {ValidationError} from "../utils/error";

export const recipeRouter = Router();

recipeRouter
    // listing all recipes from db
    .get('/listAll', async (req, res) => {
        const recipes: RecipeEntity[] = await RecipeRecord.getAll();
        res.json(recipes);
    })

    // listing the latest week recipes from db
    .get('/listLatestWeek', async (req, res) => {
        const recipes: RecipeEntity[] = await RecipeRecord.getLastWeek();
        res.json(recipes);
    })

    // listing recipes by date range from db
    .get('/getDateRange/:firstDate/:secondDate', async (req, res) => {
        const recipes: RecipeEntity[] = await RecipeRecord.getDateRange(req.params.firstDate, req.params.secondDate);
        res.json(recipes);
    })

    // adding new recipe to db
    .post('/', async (req, res) => {
        const newRecipe = await RecipeRecord.insertToDb(req.body);
        res.json(newRecipe);

    })

    // deleting specific recipe from db
    .delete('/:id', async (req, res) => {
        const deleteRecipe = await RecipeRecord.deleteFromDb(req.params.id);
        if (!deleteRecipe) {
            throw new ValidationError(`No recipe with id ${req.params.id}`);
        }
        res.json(deleteRecipe);
    })

