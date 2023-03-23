import {RecipeEntity} from "../types";
import {ValidationError} from "../utils/error";
import {regexp} from "../utils/regexpFormatDate";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type RecipeRecordResult = [RecipeEntity[], FieldPacket[]];

interface NewRecipeEntity extends Omit<RecipeEntity, 'id'> {
    id?: string;
}


export class RecipeRecord implements RecipeEntity {

    id?: string;
    name: string;
    date: string;
    price: number;
    //weight: number;
    shopName: string;
    categoryName: string;

    //symbol: string;


    constructor(obj: NewRecipeEntity) {
        if (!obj.name || obj.name.length > 50) {
            throw new ValidationError('The name can not be empty or contains more than 50 chars.');
        }

        if (obj.date.length > 10 && regexp.test(obj.date)) {
            throw new ValidationError('The date can not be empty and must contain 10 chars valid with YYYY-MM-DD format.');
        }

        if (obj.price < 0 || obj.price > 9999999.99) {
            throw new ValidationError('The price must be contain in scope 0.00 - 9 999 999.99.');
        }

        // if (obj.weight < 0.00009 || obj.weight > 99999) {
        //     throw new ValidationError('The weight must be contain in scope 0.00009 - 99 999.');
        // }

        if (!obj.shopName || obj.shopName.length > 50) {
            throw new ValidationError('The shop name can not be empty or contains more than 50 chars.');
        }


        // if (!obj.symbol || obj.symbol.length >= 4) {
        //     throw new ValidationError('The symbol of weight name can not be empty or contains more than 4 chars.');
        // }

        this.id = obj.id;
        this.name = obj.name;
        this.date = obj.date;
        this.price = obj.price;
        //this.weight = obj.weight;
        this.shopName = obj.shopName;
        this.categoryName = obj.categoryName;
        //this.symbol = obj.symbol;


    }

    static async getAll(): Promise<RecipeEntity[]> {
        const [results] = await pool.execute('SELECT `expense`.`id`, CAST(DATE(`expense`.`date`) AS CHAR) AS date, `expense`.`price`, CONCAT(`index`.`name`, " ", ROUND(`index`.`weight`, 2), `unit`.`symbol`) AS name, `place`.`name` AS shopName, `category`.`name` AS categoryName \n' +
            'FROM `expense`\n' +
            'LEFT JOIN `index` ON `expense`.`index_id`=`index`.`id`\n' +
            'LEFT JOIN `place` ON `expense`.`place`=`place`.`id`\n' +
            'LEFT JOIN `category` ON `index`.`category`=`category`.`id`\n' +
            'LEFT JOIN `unit` ON `index`.`unit`=`unit`.`id`') as RecipeRecordResult;
        return results.map(result => new RecipeRecord(result));
    }

    static async getLastWeek(): Promise<RecipeEntity[]> {
        const [results] = await pool.execute('SELECT \n' +
            '\t`expense`.`id`, CAST(DATE(`expense`.`date`) AS CHAR) AS date, CAST(`expense`.`price` AS CHAR) AS price, \n' +
            '\tCONCAT(`index`.`name`, " ", ROUND(`index`.`weight`, 2), `unit`.`symbol`) AS name, \n' +
            '\t`place`.`name` AS shopName, `category`.`name` AS categoryName, `expense`.`fill_date`\n' +
            'FROM `expense`\n' +
            'LEFT JOIN `index` ON `expense`.`index_id`=`index`.`id`\n' +
            'LEFT JOIN `place` ON `expense`.`place`=`place`.`id`\n' +
            'LEFT JOIN `category` ON `index`.`category`=`category`.`id`\n' +
            'LEFT JOIN `unit` ON `index`.`unit`=`unit`.`id`\n' +
            'WHERE `expense`.`fill_date` BETWEEN CURRENT_DATE() - interval 1 week AND CURRENT_DATE()') as RecipeRecordResult;
        return results.map(result => new RecipeRecord(result));
    }


}
