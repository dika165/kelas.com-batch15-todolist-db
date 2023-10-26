import { getData, getDataById, createData } from "../repositories/users.js";

export const createUser = async (name, email, password) => {
    let [result] = await createData(name, email,password);
    
    if (result.insertId > 0) {
        console.log(`berhasil menambahkan user dengan id : ${result.insertId}`);
    } else {
        console.log("gagal menambahkan user");
    }
}

export const getUser = async () => {
    let [result] = await getData();

    if (result.length > 0) {
        console.log(result);
    } else {
        console.log("tidak ada data user");
    }
}

export const getUserDetail = async (id) => {
    let [result] = await getDataById(id);

    if (result.length > 0) {
        console.log(result[0]);
    } else {
        console.log(`user dengan id ${id} tidak ditemukan`);
    }
}