import {createPool} from "mysql2/promise";

// db connection credentials
export const pool = createPool({
    host: 'localhost',
    user: 'root',
    //password: '',
    database: 'the_budget',
    namedPlaceholders: true,
    decimalNumbers: true,
});
