import {Router} from "express";
import {ShopEntity} from "../types";

import {ShopRecord} from "../records/shop.record";

export const shopRouter = Router();

shopRouter
    .get('/listAll', async (req, res) => {
        const shops: ShopEntity[] = await ShopRecord.getAll();
        res.json(shops);
    })
    .delete('/:id', async (req, res) => {
        const deleteShop = await ShopRecord.deleteFromDb(req.params.id);
        res.json(deleteShop);
    })
    .post('/', async (req, res) => {
        const addShop = new ShopRecord(req.body);
        console.log(addShop);
        await addShop.insertToDb();
        res.json(addShop);

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
