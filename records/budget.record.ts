import {ValidationError} from "../utils/error";
import {pool} from "../utils/db";
import {FieldPacket, ResultSetHeader} from "mysql2";
import {BudgetEntity, NewBudgetEntity, StatsFromBudget} from "../types";

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
        const [results] = await pool.execute('SELECT (SELECT * FROM `the_budget`.`budget`) AS budget, IFNULL((SELECT SUM(price) FROM `the_budget`.`expense`\n' +
            '            WHERE MONTH(`expense`.`date`) = MONTH(NOW()) AND YEAR(`expense`.`date`) = YEAR(NOW())),0) AS expense') as BudgetRecordResult;
        return results.map(result => new BudgetRecord(result));
    }

    static async updateBudget(newBudgetValue: number): Promise<number> {
        const [results] = ((await pool.execute('UPDATE `the_budget`.`budget`\n' +
            'SET `budget`.`budget` = :newBudgetValue;', {
            newBudgetValue
        })) as ResultSetHeader[]);
        return results.affectedRows;
    }

    static async getStatsPerCategory() {
        const [results] = await pool.execute(' SELECT `category`.`name` AS categoryName, SUM(`expense`.`price`) AS expenseSum\n' +
            '        FROM `expense`\n' +
            '        LEFT JOIN `index` ON `expense`.`index_id`=`index`.`id`\n' +
            '        LEFT JOIN `place` ON `expense`.`place`=`place`.`id`\n' +
            '        LEFT JOIN `category` ON `index`.`category`=`category`.`id`\n' +
            '        GROUP BY `category`.`name`') as [StatsFromBudget[], FieldPacket[]];
        return results.length !== 0 ? results.map(result => result) : [{categoryName: 'No category', expenseSum: 1}];
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
