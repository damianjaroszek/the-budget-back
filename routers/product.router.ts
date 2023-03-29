import {Router} from "express";
import {ProductEntity} from "../types";

import {ProductRecord} from "../records/product.record";

export const productRouter = Router();

productRouter
    .get('/listAll', async (req, res) => {
        const products: ProductEntity[] = await ProductRecord.getAll();
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
