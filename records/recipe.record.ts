import {NewRecipe, RecipeEntity} from "../types";
import {ValidationError} from "../utils/error";
import {regexp} from "../utils/regexpFormatDate";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

type RecipeRecordResult = [RecipeEntity[], FieldPacket[]];

interface NewRecipeEntity extends Omit<RecipeEntity, 'id'> {
    id?: string;
}


export class RecipeRecord implements RecipeEntity {

    id?: string;
    name: string;
    date: string;
    price: number;
    shopName: string;
    categoryName: string;



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

        if (!obj.shopName || obj.shopName.length > 50) {
            throw new ValidationError('The shop name can not be empty or contains more than 50 chars.');
        }


        this.id = obj.id;
        this.name = obj.name;
        this.date = obj.date;
        this.price = obj.price;
        this.shopName = obj.shopName;
        this.categoryName = obj.categoryName;

    }

    static async getAll(): Promise<RecipeEntity[]> {
        const [results] = await pool.execute('SELECT `expense`.`id`, CAST(DATE(`expense`.`date`) AS CHAR) AS date, `expense`.`price`, `index`.`name`, `place`.`name` AS shopName, `category`.`name` AS categoryName\n' +
            '            FROM `expense`\n' +
            '            LEFT JOIN `index` ON `expense`.`index_id`=`index`.`id`\n' +
            '            LEFT JOIN `place` ON `expense`.`place`=`place`.`id`\n' +
            '            LEFT JOIN `category` ON `index`.`category`=`category`.`id`') as RecipeRecordResult;
        return results.map(result => new RecipeRecord(result));
    }

    static async getLastWeek(): Promise<RecipeEntity[]> {
        const [results] = await pool.execute('SELECT `expense`.`id`, CAST(DATE(`expense`.`date`) AS CHAR) AS date, CAST(`expense`.`price` AS CHAR) AS price,\n' +
            '                      `index`.`name`,\n' +
            '                      `place`.`name` AS shopName, `category`.`name` AS categoryName, `expense`.`fill_date`\n' +
            '          \t\t\t\t  FROM `expense`\n' +
            '          \t\t\t\t  LEFT JOIN `index` ON `expense`.`index_id`=`index`.`id`\n' +
            '                       LEFT JOIN `place` ON `expense`.`place`=`place`.`id`\n' +
            '                       LEFT JOIN `category` ON `index`.`category`=`category`.`id`\n' +
            '                     \n' +
            '                      WHERE `expense`.`fill_date` BETWEEN CURRENT_TIMESTAMP() - interval 1 week AND CURRENT_TIMESTAMP()\n' +
            '                      ORDER BY `expense`.`fill_date` DESC') as RecipeRecordResult;
        return results.map(result => new RecipeRecord(result));
    }

    static async getDateRange(firstDate: string, secondDate: string): Promise<RecipeEntity[]> {
        const [results] = await pool.execute('SELECT `expense`.`id`, CAST(DATE(`expense`.`date`) AS CHAR) AS date, CAST(`expense`.`price` AS CHAR) AS price,\n' +
            '                        `index`.`name`,\n' +
            '                        `place`.`name` AS shopName, `category`.`name` AS categoryName, `expense`.`fill_date`\n' +
            '                      FROM `expense`\n' +
            '                       LEFT JOIN `index` ON `expense`.`index_id`=`index`.`id`\n' +
            '                       LEFT JOIN `place` ON `expense`.`place`=`place`.`id`\n' +
            '                      LEFT JOIN `category` ON `index`.`category`=`category`.`id`\n' +
            '             \n' +
            '                        WHERE `expense`.`date` BETWEEN :firstDate AND :secondDate\n' +
            '                       ORDER BY `expense`.`fill_date` DESC', {
            firstDate,
            secondDate,
        }) as RecipeRecordResult;
        return results.map(result => new RecipeRecord(result));
    }


    static async insertToDb(obj: NewRecipe): Promise<string> {
        obj.id = uuid();
        await pool.execute('INSERT INTO `expense` (`id`, `date`, `price`, `index_id`, `place`) VALUES (:id, :date, :price, :index_id, :place)', {
            id: obj.id,
            date: obj.date,
            price: obj.price,
            index_id: obj.productId,
            place: obj.shopId,
        });
        return obj.id;
    }

    static async deleteFromDb(id: string): Promise<any> {
        const affectedRows = await pool.execute('DELETE FROM `the_budget`.`expense` WHERE `the_budget`.`expense`.`id`=:id', {
            id,
        });
        return affectedRows;
    }
}




