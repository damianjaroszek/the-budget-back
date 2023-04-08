import {Router} from "express";
import {ShopEntity} from "../types";

import {ShopRecord} from "../records/shop.record";

export const shopRouter = Router();

shopRouter
    // listing all shops from db
    .get('/listAll', async (req, res) => {
        const shops: ShopEntity[] = await ShopRecord.getAll();
        res.json(shops);
    })

    // deleting specific shop from db
    .delete('/:id', async (req, res) => {
        const deleteShop = await ShopRecord.deleteFromDb(req.params.id);
        res.json(deleteShop);
    })

    // adding new shop to db
    .post('/', async (req, res) => {
        const addShop = new ShopRecord(req.body);
        await addShop.insertToDb();
        res.json(addShop);

    });
