import pool from "../database/db.js";

class Product {

    // create/update
    static async save(query, datas) {
        const [result] = await pool.execute(query, [...Object.values(datas)]);
        return result;
    }

    static async getAll(query){
        const [result] = await pool.execute(query);
        return result;
    }
    
    static async getOne(query, id){
        const [result] = await pool.execute(query, [id]);
        return result;
    }

    static async deleteOne(query, id){
        const [result] = await pool.execute(query, [id]);
        return result;
    }

}

export default Product;
