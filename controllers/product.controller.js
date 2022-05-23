import Product from "../models/product.model.js";

export const create = async (req, res, next) => {
    const datas = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        qttInStock: req.body.quantity_in_stock,
        price: req.body.price,
        category_id: req.body.category_id,
    };

    const query = "INSERT INTO product (title, description, image, quantity_in_stock, price, date, category_id ) VALUES (?,?,?,?,NOW(),?)";
    try {
        await Product.save(query, datas);
        res.status(201).json({
            status: 201,
            msg: "product added !",
        });
    } catch (error) {
        return next(error);   
    }
};

export const readAll = async (req, res, next) => {
    const query = `SELECT product.id AS product_ID, category.id AS category_id, product.title AS product_title, category.title AS category_title, description, image, quantity_in_stock, price, date, color
    FROM product 
    JOIN category ON product.category_id = category.id`;
    try {
        const result = await Product.getAll(query);
        res.status(200).json({
            status: 200,
            msg: "products retrieved !",
            products: result,
        });
    } catch (error) {
        return next(error);   
    }
};

export const readOne = async (req, res, next) => {
    const query = `SELECT product.id AS product_ID, category.id AS category_id, product.title AS product_title, category.title AS category_title, description, image, quantity_in_stock, price, date, color 
    FROM product 
    JOIN category ON product.category_id = category.id
    WHERE product.id = ?`;
    try {
        const result = await Product.getOne(query, req.params.id);
        res.status(200).json({
            status: 200,
            msg: "product retrieved !",
            product: result,
        });
    } catch (error) {
        return next(error);        
    }
};

export const update = async (req, res, next) => {
    let datas = {};

    for (const key in req.body) {
        datas[key] = req.body[key];
    }

    datas = { ...datas, id: req.params.id };    
    const query =  `UPDATE product SET
                    ${typeof datas.title !== "undefined" ? `title = ?,` : ""}
                    ${typeof datas.description !== "undefined" ? `description = ?,` : ""}
                    ${typeof datas.image !== "undefined" ? `image = ?,` : ""}
                    ${typeof datas.quantity_in_stock !== "undefined" ? `quantity_in_stock = ?,` : ""}
                    ${typeof datas.price !== "undefined" ? `price = ?,` : ""}
                    ${typeof datas.category_id !== "undefined" ? `category_id = ?,` : ""}
                    WHERE id = ?`.replace(/,(?=[^,]*$)/, '');
    try {
        await Product.save(query, datas)
        res.status(200).json({
            status: 200,
            msg: "product updated !",
        });
    } catch (error) {
        return next(error);   
    }
};

export const deleteOne = async (req, res, next) => {
    const query = `DELETE FROM product WHERE id = ?`;
    try {
        await Product.deleteOne(query, req.params.id);
        res.status(200).json({
            status: 200,
            msg: "product deleted",
        })
    } catch (error) {
        return next(error);
    }
}
