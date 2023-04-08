import {Router} from "express";
import {CategoryEntity} from "../types";
import {CategoryRecord} from "../records/category.record";

export const categoryRouter = Router();

categoryRouter

    // listing all categories from db
    .get('/listAll', async (req, res) => {
        const category: CategoryEntity[] = await CategoryRecord.getAll();
        res.json(category);
    })

    // deleting specific category from db
    .delete('/:id', async (req, res) => {
        const deleteCategory = await CategoryRecord.deleteFromDb(req.params.id);
        res.json(deleteCategory);
    })

    // adding category to db
    .post('/', async (req, res) => {
        const addCategory = new CategoryRecord(req.body);
        await addCategory.insertToDb();
        res.json(addCategory);
    });

