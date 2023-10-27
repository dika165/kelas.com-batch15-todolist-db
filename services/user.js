import { getData, getDataById, createData, deleteData, getDataByEmail } from "../repositories/users.js";
import { errorResponse, successResponse } from "../utils/response.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_ACCESS_TOKEN = 'kelas.com';
const SECRET_REFRESH_TOKEN = 'backend';

export const createUser =async (request, response, next) => {
    try {
        let name = request.body.name;
        let email = request.body.email;
        let password = request.body.password;
        let saltRound = 10;
        bcrypt.hash(password,saltRound, async (error, hashedPass) => {
            let [result] = await createData(name, email,hashedPass);
    
            if (result.insertId > 0) {
                successResponse(response, "success create user", result.insertId)
            } else {
                errorResponse(response, "failed create user", 500)
            }
        })
        
    } catch (error) {
        next(error);
    }
}

export const getUser = async (request, response, next) => {
    try {
        let [result] = await getData();
        console.log(request.claims);

        if (result.length > 0) {
            successResponse(response, "success", result)
        } else {
            errorResponse(response, "data not found", 404)
        }
    } catch (error) {
        next(error);
    }
    
}

export const getUserDetail = async (request, response, next) => {
    try {
        let id = request.params.id;
        let [result] = await getDataById(id);

        if (result.length > 0) {
            successResponse(response, "success", result[0]);
        } else {
            errorResponse(response, `user dengan id ${id} tidak ditemukan`, 404)
        }
    } catch(error) {
        next(error)
    }
    
}

export const deleteUser = async (request, response, next) => {
    try {
        let id = request.params.id;
        let [result] = await deleteData(id);

        if (result.affectedRows > 0) {
            successResponse(response, "success", {});
        } else {
            errorResponse(response, `user dengan id ${id} tidak ditemukan`, 404)
        }
    } catch(error) {
        next(error)
    }
    
}


export const authUser = async (request, response, next) => {
    try {
        let email = request.body.email;
        let password = request.body.password;
        let [result] = await getDataByEmail(email);

        if (result.length > 0) {
            let user = result[0];
            bcrypt.compare(password, user.password, (error, isValid) => {
                if (isValid) {
                    let payload ={
                        user_id: user.user_id, 
                        name: user.name,
                        email:user.email
                    }
                    let accessToken = jwt.sign(payload, SECRET_ACCESS_TOKEN, {expiresIn:'15m'})
                    let refreshToken = jwt.sign(payload, SECRET_REFRESH_TOKEN, {expiresIn:'30m'})
                    let data = {
                        access_token: accessToken, 
                        refresh_token: refreshToken,
                    }
                    successResponse(response, "success", data);
                } else {
                    errorResponse(response, "email dan password salah!", 401)
                }
            })
            
        } else {
            errorResponse(response, `email dan password salah!`, 401)
        }
    } catch(error) {
        next(error)
    }
    
}

export const tokenValidation = (request, response, next) => {
    const authHeader = request.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (accessToken) {
        jwt.verify(accessToken, SECRET_ACCESS_TOKEN, (error, payload) => {
            if(error) {
                errorResponse(response, error.message, 403)
            } else {
                request.claims = payload;
                next()
            }
        })
    } else {
        errorResponse(response, "invalid request, authorization header not found!!")
    }
}

