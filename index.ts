import express, {json, Router} from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/error";
import {recipeRouter} from "./routers/recipe.router";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json());

// Routers

// app.get('/', async(req, res)=>{
//     throw new Error('Something was wrong');  // sprawdzamy czy obsługa błędów działa
// });

// app.get('/', async(req, res)=> {
//     throw new ValidationError('Something was wrong');  // sprawdzamy czy obsługa błędów działa
// });

// app.get('/', async (req, res) => {
//     const recpies: RecipeEntity[] = await RecipeRecord.getAll();
//     res.json(recpies);
//     console.log(recpies);
// });

// Routers
const router = Router();
router.use('/recipe', recipeRouter)
app.use('/api', router);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
});
