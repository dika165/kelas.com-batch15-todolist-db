import dbPool from "../utils/db.js";

const getData = () => {
    const query = "SELECT user_id, name, email, password, created_at FROM users";
    
    return dbPool.query(query);
}

const createData = (name, email, password) => {
    let createdAt = new Date();

    const query = "INSERT INTO users(name, email, password, created_at) VALUES (?, ?, ?, ?)";
    const values = [name, email, password, createdAt];

    return dbPool.query(query,values);
}

const getDataById = (id) => {
    const query = "SELECT user_id, name, email, password, created_at FROM users WHERE user_id = ?";
    
    return dbPool.query(query, [id]);
}

export { getData, createData, getDataById }