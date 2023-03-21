import {ShopEntity} from "../types";
import {ValidationError} from "../utils/error";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type ShopRecordResult = [ShopEntity[], FieldPacket[]];

interface NewShopEntity extends Omit<ShopEntity, 'id'> {
    id?: string;
}

export class ShopRecord implements ShopEntity {

    id?: string;
    name: string;


    constructor(obj: NewShopEntity) {
        if (!obj.name || obj.name.length > 50) {
            throw new ValidationError('The name can not be empty or contains more than 50 chars.');
        }

        this.id = obj.id;
        this.name = obj.name;


    }


    static async getAll(): Promise<ShopEntity[]> {
        const [results] = await pool.execute('SELECT * FROM `the_budget`.`place`') as ShopRecordResult;
        return results.map(result => new ShopRecord(result));
    }


}
