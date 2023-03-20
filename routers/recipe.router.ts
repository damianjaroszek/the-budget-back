import {Router} from "express";
import {RecipeEntity} from "../types";
import {RecipeRecord} from "../records/recipe.record";

export const recipeRouter = Router();

recipeRouter
    .get('/listAll', async (req, res) => {
        const recpies: RecipeEntity[] = await RecipeRecord.getAll();
        res.json(recpies);
    });

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
