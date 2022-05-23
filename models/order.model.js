import pool from "../database/db.js";

class Order {
    // create/update
    static async save(query, datas) {
        const [result] = await pool.execute(query, [...Object.values(datas)]);
        return result;
    }

    static async getAll(query) {
        const [result] = await pool.execute(query);
        return result;
    }

    static async getOne(query, value) {
        const [result] = await pool.execute(query, [value]);
        return result;
    }

    static async getAllbyValue(query, value) {
        const [result] = await pool.execute(query, [value]);
        return result;
    }

    static async deleteOne(query, id) {
        const [result] = await pool.execute(query, [id]);
        return result;
    }
}

export default Order;
