import {ProductEntity} from "../types";
import {ValidationError} from "../utils/error";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type ProductRecordResult = [ProductEntity[], FieldPacket[]];

interface NewProductEntity extends Omit<ProductEntity, 'id'> {
    id?: string;
}

export class ProductRecord implements ProductEntity {

    id?: string;
    name: string;
    weight: number;
    categoryName: string;

    //symbol: string;


    constructor(obj: NewProductEntity) {
        if (!obj.name || obj.name.length > 50) {
            throw new ValidationError('The name can not be empty or contains more than 50 chars.');
        }

        if (obj.weight < 0.01 || obj.weight > 9999999.99) {
            throw new ValidationError('The weight must be contain in scope 0.01 -  9 999 999.99.');
        }

        // if (!obj.categoryName || obj.categoryName.length > 100) {
        //     throw new ValidationError('The name of category can not be empty or contains more than 100 chars.');
        // }

        // if (!obj.symbol || obj.symbol.length > 4) {
        //     throw new ValidationError('The symbol of weight name can not be empty or contains more than 4 chars.');
        // }

        this.id = obj.id;
        this.name = obj.name;
        this.weight = obj.weight;
        //this.categoryName = obj.categoryName;
        //this.symbol = obj.symbol;


    }


    static async getAll(): Promise<ProductEntity[]> {
        const [results] = await pool.execute('SELECT \n' +
            '\t`index`.`id`, CONCAT(`index`.`name`, " ", ROUND(`index`.`weight`, 2), `unit`.`symbol`) AS name\n' +
            'FROM `index`\n' +
            'LEFT JOIN `unit` ON `index`.`unit`=`unit`.`id`') as ProductRecordResult;
        return results.map(result => new ProductRecord(result));
    }


}
