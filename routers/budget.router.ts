import {Router} from "express";
import {BudgetEntity, StatsFromBudget} from "../types";

import {BudgetRecord} from "../records/budget.record";

export const budgetRouter = Router();

budgetRouter

    // getting budget and expense values from db
    .get('/showBudgetExpense', async (req, res) => {
        const budgetAndExpense: BudgetEntity[] = await BudgetRecord.getBudgetAndExpense();
        res.json(budgetAndExpense);
    })

    // getting stats per category - [{categoryName: 'Food', expenseSum: 58}]
    .get('/getStatsPerCategory', async (req, res) => {
        const getStats: StatsFromBudget[] = await BudgetRecord.getStatsPerCategory();
        res.json(getStats);
    })

    // updating changed value of budget
    .put('/', async (req, res) => {
        const newBudgetValue = await BudgetRecord.updateBudget(req.body.budget)
        res.json(newBudgetValue);
    });


