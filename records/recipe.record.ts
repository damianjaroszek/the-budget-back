import {RecipeEntity} from "../types";
import {ValidationError} from "../utils/error";
import {regexp} from "../utils/regexpFormatDate";


interface NewRecipeEntity extends Omit<RecipeEntity, 'id'> {
    id?: string;
}


export class RecipeRecord implements RecipeEntity {

    id: string;
    name: string;
    date: string;
    price: number;
    weight: number;
    shopName: string;
    category: string;
    symbol: string;


    constructor(obj: NewRecipeEntity) {
        if (!obj.name || obj.name.length > 50) {
            throw new ValidationError('The name can not be empty or contains more than 50 chars.');
        }

        if (obj.date.length === 10 && regexp.test(obj.date)) {
            throw new ValidationError('The date can not be empty and must contain 10 chars valid with YYYY-MM-DD format.');
        }

        if (obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError('The price must be contain in scope 0.00 - 9 999 999.');
        }

        if (obj.weight < 0.00009 || obj.weight > 99999) {
            throw new ValidationError('The weight must be contain in scope 0.00009 - 99 999.');
        }

        if (!obj.shopName || obj.shopName.length >= 50) {
            throw new ValidationError('The shop name can not be empty or contains more than 50 chars.');
        }

        if (!obj.category || obj.category.length >= 100) {
            throw new ValidationError('The shop name can not be empty or contains more than 100 chars.');
        }

        if (!obj.symbol || obj.symbol.length >= 4) {
            throw new ValidationError('The shop name can not be empty or contains more than 4 chars.');
        }

        this.name = obj.name;
        this.date = obj.date;
        this.price = obj.price;
        this.weight = obj.weight;
        this.shopName = obj.shopName;
        this.category = obj.category;
        this.symbol = obj.symbol;


    }


}
