/*
    1. Buat endpoint untuk update data user, dan buat responsenya berupa object user yang di update;
    3. modifiksi function create user, yang return nya adalah menampilkan object data yang
       telah di tambahkan.
*/
import * as UserService from './services/user.js';
import express from 'express';

const port = 8080;
const host = "localhost";
const app = express();
app.use(express.json());
app.get("/users",UserService.getUser);
app.get("/users/:id", UserService.getUserDetail);
app.post("/users", UserService.createUser);
app.delete("/users/:id", UserService.deleteUser);


app.listen(port, host, () => {
    console.log(`Server berjalan di http://${host}:${port}`);
});