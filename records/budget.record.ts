import {ValidationError} from "../utils/error";
import {pool} from "../utils/db";
import {FieldPacket, ResultSetHeader} from "mysql2";
import {BudgetEntity, NewBudgetEntity} from "../types";

type BudgetRecordResult = [BudgetEntity[], FieldPacket[]];

export class BudgetRecord implements BudgetEntity {

    budget: number
    expense: number;


    constructor(obj: NewBudgetEntity) {
        if (!obj.budget || obj.budget > 999999999.99 && obj.budget <= 0) {
            throw new ValidationError('The value of budget can not be empty or be grater than 999999999.99.');
        }

        this.budget = obj.budget;
        this.expense = obj.expense;

    }


    static async getBudgetAndExpense(): Promise<BudgetEntity[]> {
        const [results] = await pool.execute('SELECT (SELECT * FROM `the_budget`.`budget`) AS budget, SUM(price) AS expense FROM `the_budget`.`expense`\n' +
            'WHERE MONTH(`expense`.`date`) = MONTH(NOW()) AND YEAR(`expense`.`date`) = YEAR(now());') as BudgetRecordResult;
        return results.map(result => new BudgetRecord(result));
    }

    static async updateBudget(newBudgetValue: number): Promise<number> {
        const [results] = ((await pool.execute('UPDATE `the_budget`.`budget`\n' +
            'SET `budget`.`budget` = :newBudgetValue;', {
            newBudgetValue
        })) as ResultSetHeader[]);
        return results.affectedRows;
    }

    //
    // static async deleteFromDb(id: string): Promise<CategoryRecordResult[]> {
    //     if (!id) {
    //         throw new Error(`Shop with ${id} is not exist in database.`)
    //     }
    //
    //     const [affectedRows] = await pool.execute('DELETE FROM `the_budget`.`place` WHERE `place`.`id`=:id', {
    //         id,
    //     });
    //     return affectedRows as CategoryRecordResult[];
    // }
    //
    // async insertToDb(): Promise<string> {
    //     if (!this.id) {
    //         this.id = uuid();
    //     } else {
    //         throw new ValidationError('The shop is already exist.')
    //     }
    //     await pool.execute('INSERT INTO `the_budget`.`place` (`name`) VALUES (:name)', {
    //         name: this.name,
    //     });
    //     return this.id;
    // }

}
