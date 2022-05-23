import User from "../models/user.model.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { saltRounds } from '../config/index.js';
import jwt from 'jsonwebtoken';
import mail from "../lib/mailing.js";

const { TOKEN_SECRET } = process.env;

export const create = async (req,res,next) => {
    console.log(req.body)
    const query = "SELECT * from user WHERE email = ?";
    try {
        const result = await User.getOne(query, req.body.email);
        if(result.length){
            return res.status(409).json({
                status: 409,
                msg: "user already exist",
            })
        } else {
            const hash = await bcrypt.hash(req.body.password, saltRounds);
            const datas = {
                email: req.body.email,
                password: hash,                
                uuid: uuidv4(),
                role: 3,
            }
            console.log(result)
            const query = "INSERT INTO user (email, password, signup_date, uuid, isValidated, role_id) VALUES (?,?,NOW(),?, 'no', ?)";
            await User.save(query, datas);
            // envoi du mail
            mail(req.body.email, "Validation du compte", "Bienvenue", "Encore une petite étape, plus qu'à cliquer sur le lien ci-dessous ", datas.uuid );
            
            res.status(201).json({
                status: 201,
                msg: "Welcome, check your email to validate your registration.",
            })
        }
    } catch (error) {
        return next(error);
    }
}

export const signin = async (req,res,next) => {
    const {email, password} = req.body;
    const query = "SELECT * from user WHERE email = ?";
    try {
        const user = await User.getOne(query, email);
        console.log(user);
        if(!user.length){
            return res.status(404).json({
                status: 404,
                msg: "user does not exist",
            })
        }
        const match = await bcrypt.compare(password, user[0].password);
        if(match){
            const PAYLOAD = {email: user[0].email, uuid: user[0].uuid};
            const TOKEN   = jwt.sign(PAYLOAD, TOKEN_SECRET);
            res.status(200).json({status: 200, token: TOKEN, uuid: user[0].uuid, role: user[0].role_id,isAccountValidated: user[0].isValidated});
        } else {
            res.status(401).json({status: 401, error: "Wrong password"});
        }
    } catch (error) {
        return next(error);
    }
}

export const readAll = async (req,res,next) => {
    const query = "SELECT * FROM user";
    try {
        const users = await User.getAll(query);
        res.status(200).json({status: 200, msg: "users retrieved", users: users})
    } catch (error) {
        return next(error);
    }
}

export const readOne = async (req,res,next) => {
    let uuid = req.params.uuid;
    const query = "SELECT user.id AS user_id, role.id AS role_id, role.title AS role_title, firstname, lastname, email, address, zip, city, phone, signup_date, modified_date, last_signin, image, isValidated, uuid FROM user JOIN role ON user.role_id = role.id WHERE uuid = ?";
    try {
        const user = await User.getOne(query, uuid);
        res.status(200).json({status: 200, msg: "user retrieved", user: user[0]});
    } catch (error) {
        return next(error);
    } 
}

export const update = async (req,res,next) => {    
    
    const query = "UPDATE user SET firstname = ?, lastname = ?, address =?, zip = ?, city = ?, phone = ?, modified_date = NOW() WHERE uuid = ?"
    try {
        await User.save(query, req.body.datas);
        res.status(200).json({
            status: 200,
            msg: "Information mises à jour",
        })
    } catch (error) {
        return next(error);
    }
}

export const updateConnectionDate = async (req,res,next) => {    
    const datas = {
        uuid: req.params.uuid,
    }
    const query = "UPDATE user SET last_signin = NOW() WHERE uuid = ?";
    try {
        await User.save(query, datas);
        res.status(200).json({
            status: 200,
            msg: "Date de connexion mise à jour",
        })
    } catch (error) {
        return next(error);
    }
}

export const updateValidatedEmail = async (req,res,next) => {
    const datas = {
        uuid: req.params.uuid,
    }
    const query = "UPDATE user SET isValidated = 'yes' WHERE uuid = ?";
    try {
        await User.save(query, datas);
        res.status(200).json({
            status: 200,
            msg: "Compte validé !",
        })
    } catch (error) {
        return next(error);
    }
}





