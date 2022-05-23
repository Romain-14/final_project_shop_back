import jwt from 'jsonwebtoken';

const { TOKEN_SECRET } = process.env;

export const auth = (req, res, next) => {
    const TOKEN = req.headers['x-access-token'];
    console.log('AUTH TOKEN',TOKEN)
    if(TOKEN === undefined || TOKEN === "null"){
        res.status(404).json({status:404, msg: "token not found"});
    }else {
        jwt.verify(TOKEN, TOKEN_SECRET, (err, decoded)=>{
            console.log('DECODED',decoded)
            if(err){
                res.status(401).json({status: 401, msg: "token invalid"});
            } else {
                req.params.uuid = decoded.uuid;
                next();
            }
        })
    }
}