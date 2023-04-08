import {Router} from "express";
import {CategoryEntity} from "../types/category";
import {CategoryRecord} from "../records/category.record";

export const categoryRouter = Router();

categoryRouter
    .get('/listAll', async (req, res) => {
        const category: CategoryEntity[] = await CategoryRecord.getAll();
        res.json(category);
    });
// .delete('/:id', async (req, res) => {
//     const deleteCategory = await ShopRecord.deleteFromDb(req.params.id);
//     res.json(deleteCategory);
// })
// .post('/', async (req, res) => {
//     const addCategory = new ShopRecord(req.body);
//     console.log(addCategory);
//     await addCategory.insertToDb();
//     res.json(addCategory);
//
// });


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
