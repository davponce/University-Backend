const db = require("../config/database");

const crearUsuario = (nombre, correo, password, callback) => {
    const sql = "INSERT INTO usuarios (Nombre, Correo, Password) VALUES (?, ?, ?)";
    db.query(sql, [nombre, correo, password], callback);
};

const buscarPorCorreo = (correo, callback) => {
    const sql = "SELECT * FROM usuarios WHERE Correo = ?";
    db.query(sql, [correo], callback);
};

module.exports = {
    crearUsuario,
    buscarPorCorreo
};