import {Router} from "express";
import {ProductEntity} from "../types";

import {ProductRecord} from "../records/product.record";

export const productRouter = Router();

productRouter

    // listing all products from db
    .get('/listAll', async (req, res) => {
        const products: ProductEntity[] = await ProductRecord.getAll();
        res.json(products);
    })

    //deleting specific product from db
    .delete('/:id', async (req, res) => {
        const deleteProduct = await ProductRecord.deleteFromDb(req.params.id);
        res.json(deleteProduct);
    })

    // adding new product to db
    .post('/', async (req, res) => {
        const addProduct = ProductRecord.insertToDb(req.body);
        res.json(addProduct);
    });
