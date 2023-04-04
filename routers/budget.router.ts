import {Router} from "express";
import {BudgetEntity} from "../types";

import {BudgetRecord} from "../records/budget.record";

export const budgetRouter = Router();

budgetRouter
    .get('/showBudgetExpense', async (req, res) => {
        const budgetAndExpense: BudgetEntity[] = await BudgetRecord.getBudgetAndExpense();
        res.json(budgetAndExpense);
    });
// .delete('/:id', async (req, res) => {
//     const deleteShop = await ShopRecord.deleteFromDb(req.params.id);
//     res.json(deleteShop);
// })
// .post('/', async (req, res) => {
//     const addShop = new ShopRecord(req.body);
//     console.log(addShop);
//     await addShop.insertToDb();
//     res.json(addShop);
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
