import Order from "../models/order.model.js";

export const create = async (req, res, next) => {
    console.log('CREATE CONTROLLER', req.body);
    const datas = {
        uuid : req.body.uuid,
        totalPrice: 0,
    }
    const query1 = 'INSERT INTO purchase (user_uuid, total_price, date, status) VALUES (?,?, NOW(),"not payed")';
    const query2 = 'INSERT INTO purchase_detail (purchase_id, product_id, quantity_purchased, total_price) VALUES (?, ?, ? ,?)';
    const query3 = 'UPDATE purchase SET total_price = ? WHERE id = ?';
    try {
        const resSaved = await Order.save(query1, datas);
        const id = resSaved.insertId;
        const datasUpdate = {
            totalPrice: 0,
            id : id,
        }
        req.body.cart.forEach(async(product)=>{
            const totalPricePerProduct = parseInt(product.quantity) * parseFloat(product.price);
            const datasDetail = {
                purchase_id: id,
                product_id: product.product_ID,
                quantity_purchased: product.quantity,
                total_price: totalPricePerProduct,
            }
            await Order.save(query2, datasDetail);

        
            datasUpdate.totalPrice += totalPricePerProduct;
            await Order.save(query3, datasUpdate);
            
        })
        res.status(200).json({
            status:200,
            msg: "order commited :))",
        });
    } catch (error) {
        return next(error);
    } 
};


export const readByValue = async (req, res, next) => {
    const queryOrderByUserId = "SELECT * FROM purchase WHERE user_uuid = ?";
    // const queryDetailOrderById = "SELECT purchase.id AS purchase_ID, purchase_detail.id AS purchase_detail_ID, date, purchase.total_price AS bill_amount, purchase_detail.total_price AS products_price, quantity_purchased, status from purchase JOIN purchase_detail ON purchase.id = purchase_detail.purchase_id WHERE user_uuid = ?";
    // const queryDetailOrderById = "SELECT * FROM purchase_detail WHERE purchase_id = ?";
    const queryDetailOrderById = "SELECT purchase_detail.id, purchase_id, purchase_detail.total_price, quantity_purchased, title, description, image FROM purchase_detail JOIN product ON purchase_detail.product_id = product.id WHERE purchase_id = ?"
    try {
        const datas = {
            orders: [],
            detail: [],
        }
        const orders = await Order.getAllbyValue(queryOrderByUserId, req.params.uuid);
        datas.orders = [...orders];
        if(orders.length > 0 ){
            orders.forEach( async (order, index) => {
                const orderDetail = await Order.getAllbyValue(queryDetailOrderById, order.id);
                datas.detail = [...datas.detail, ...orderDetail];
                if(orders.length === index + 1){
                    console.log(datas)
                    res.status(200).json({
                        status: 200,
                        datas: datas,
                    })
                }
            })
        }        
    } catch (error) {
        return next(error);
    }
}

