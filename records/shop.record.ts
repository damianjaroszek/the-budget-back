import {NewShopEntity, ShopEntity} from "../types";
import {ValidationError} from "../utils/error";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

type ShopRecordResult = [ShopEntity[], FieldPacket[]];


export class ShopRecord implements ShopEntity {

    id?: string;
    name: string;
    isDeletable: number;

// validation of new shop object
    constructor(obj: NewShopEntity) {
        if (!obj.name || obj.name.length > 50) {
            throw new ValidationError('The name can not be empty or contains more than 50 chars.');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.isDeletable = obj.isDeletable;

    }

// listing shops from db
    static async getAll(): Promise<ShopEntity[]> {
        const [results] = await pool.execute('SELECT `id`, `name`, `is_deletable` AS isDeletable FROM `the_budget`.`place`') as ShopRecordResult;
        return results.map(result => new ShopRecord(result));
    }

// deleting specific shop from db
    static async deleteFromDb(id: string): Promise<ShopRecordResult[]> {
        if (!id) {
            throw new Error(`Shop with ${id} is not exist in database.`)
        }

        const [affectedRows] = await pool.execute('DELETE FROM `the_budget`.`place` WHERE `place`.`id`=:id', {
            id,
        });
        return affectedRows as ShopRecordResult[];
    }

// adding shop to db
    async insertToDb(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new ValidationError('The shop is already exist.')
        }
        await pool.execute('INSERT INTO `the_budget`.`place` (`name`) VALUES (:name)', {
            name: this.name,
        });
        return this.id;
    }

}
