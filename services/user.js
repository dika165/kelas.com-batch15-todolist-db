import { getData, getDataById, createData, deleteData } from "../repositories/users.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const createUser =async (request, response, next) => {
    try {
        let name = request.body.name;
        let email = request.body.email;
        let password = request.body.password;
        let [result] = await createData(name, email,password);
    
        if (result.insertId > 0) {
            successResponse(response, "success create user", result.insertId)
        } else {
            errorResponse(response, "failed create user", 500)
        }
    } catch (error) {
        next(error);
    }
}

export const getUser = async (request, response, next) => {
    try {
        let [result] = await getData();

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