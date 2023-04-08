import {NewProductEntity, ProductEntity} from "../types";
import {ValidationError} from "../utils/error";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

type ProductRecordResult = [ProductEntity[], FieldPacket[]];


export class ProductRecord implements ProductEntity {

    id?: string;
    name: string;
    //weight: number;
    categoryName: string;
    categoryId?: string;
    isDeletable: number;

    //symbol: string;


    constructor(obj: NewProductEntity) {
        if (!obj.name || obj.name.length > 50) {
            throw new ValidationError('The name can not be empty or contains more than 50 chars.');
        }

        if (!obj.categoryName || obj.categoryName.length > 100) {
            throw new ValidationError('The name of category can not be empty or contains more than 100 chars.');
        }

        // if (!obj.symbol || obj.symbol.length > 4) {
        //     throw new ValidationError('The symbol of weight name can not be empty or contains more than 4 chars.');
        // }

        this.id = obj.id;
        this.name = obj.name;
        this.categoryId = obj.categoryId;
        //this.weight = obj.weight;
        this.categoryName = obj.categoryName;
        this.isDeletable = obj.isDeletable;
        //this.symbol = obj.symbol;


    }


    static async getAll(): Promise<ProductEntity[]> {
        const [results] = await pool.execute('SELECT `index`.`id`, `index`.`name`, `category`.`name` AS categoryName, `index`.`is_deletable` AS isDeletable\n' +
            'FROM `index`\n' +
            'LEFT JOIN `category` ON `index`.`category` = `category`.`id`') as ProductRecordResult;
        return results.map(result => new ProductRecord(result));
    }

    static async deleteFromDb(id: string): Promise<ProductEntity[]> {
        if (!id) {
            throw new Error(`Product with ${id} is not exist in database.`)
        }

        const [affectedRows] = await pool.execute('DELETE FROM `the_budget`.`index` WHERE `index`.`id`=:id', {
            id,
        });
        return affectedRows as ProductEntity[];
    }

    static async insertToDb(obj: NewProductEntity): Promise<string> {
        if (!obj.id) {
            obj.id = uuid();
        } else {
            throw new ValidationError('The Product is already exist.')
        }
        await pool.execute('INSERT INTO `the_budget`.`index` (`name`, `category`) VALUES (:name, :category)', {
            name: obj.name,
            category: obj.categoryId,
        });
        return obj.id;
    }


}
