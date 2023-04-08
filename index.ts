import express, {json, Router} from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/error";
import {recipeRouter} from "./routers/recipe.router";
import {productRouter} from "./routers/product.router";
import {shopRouter} from "./routers/shop.router";
import {categoryRouter} from "./routers/category.router";
import {budgetRouter} from "./routers/budget.router";
import rateLimit from "express-rate-limit";

const app = express();

// Cors settings
app.use(cors({
    origin: 'http://localhost:3000',
}));

// It parses incoming JSON requests and puts the parsed data in req.body.
app.use(json());

// Routers
const router = Router();
router.use('/recipe', recipeRouter)
router.use('/product', productRouter)
router.use('/shop', shopRouter)
router.use('/category', categoryRouter)
router.use('/budget', budgetRouter)
app.use('/api', router);

// Limited requests per IP
app.use(rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 250,
}))

// error handling
app.use(handleError);


app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
});
