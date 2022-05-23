import mysql from "mysql2/promise";
import "dotenv/config";

const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const pool = mysql.createPool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 1000,
    queueLimit: 0,
});

pool.getConnection()
    .then((res) => {
        console.log(`Connected to '${res.config.database}' database`);
    })
    .catch((err) => {
        console.log("ERROR -----> ", err);
    });

export default pool;
