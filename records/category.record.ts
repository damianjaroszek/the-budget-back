import {ValidationError} from "../utils/error";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {CategoryEntity, NewCategoryEntity} from "../types";
import {v4 as uuid} from "uuid";

type CategoryRecordResult = [CategoryEntity[], FieldPacket[]];


export class CategoryRecord implements CategoryEntity {

    id?: string;
    name: string;
    isDeletable: number;

// validate new category object
    constructor(obj: NewCategoryEntity) {
        if (!obj.name || obj.name.length > 50) {
            throw new ValidationError('The name of category can not be empty or contains more than 50 chars.');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.isDeletable = obj.isDeletable;

    }

// listing all categories from db
    static async getAll(): Promise<CategoryEntity[]> {
        const [results] = await pool.execute('SELECT `category`.`id`, `category`.`name`, `category`.`is_deletable` AS isDeletable FROM `the_budget`.`category`') as CategoryRecordResult;
        return results.map(result => new CategoryRecord(result));
    }

// deleting specific category from db
    static async deleteFromDb(id: string): Promise<CategoryRecordResult[]> {
        if (!id) {
            throw new Error(`Category with ${id} is not exist in database.`)
        }

        const [affectedRows] = await pool.execute('DELETE FROM `the_budget`.`category` WHERE `category`.`id`=:id', {
            id,
        });
        return affectedRows as CategoryRecordResult[];
    }

// adding new category to db
    async insertToDb(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new ValidationError('The category is already exist.')
        }
        await pool.execute('INSERT INTO `the_budget`.`category` (`name`) VALUES (:name)', {
            name: this.name,
        });
        return this.id;
    }
}
