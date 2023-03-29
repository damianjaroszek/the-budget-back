import {Router} from "express";
import {ShopEntity} from "../types";

import {ShopRecord} from "../records/shop.record";

export const shopRouter = Router();

shopRouter
    .get('/listAll', async (req, res) => {
        const products: ShopEntity[] = await ShopRecord.getAll();
        res.json(products);
    })

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
