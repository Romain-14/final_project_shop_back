
export const errorHandler = (err, req, res, next)=>{
    console.log('ERR', err);
    console.log(err.code)
    res.json({ 
        status: 500,
        msg: "Matrix error",
    });
}