const db = require("../config/database");

const obtenerTodos = (callback) => {
  const sql = "SELECT * FROM Alumno";
    db.query(sql, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};

const obtenerPorId = (id, callback) => {
  const sql = "SELECT * FROM Alumno WHERE id_alumno = ?";
  db.query(sql, [id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
};

const crear = (datos, callback) => {
  const sql = "INSERT INTO Alumno (nombre, correo, carrera, semestre) VALUES (?, ?, ?, ?)";

  const valores = [
    datos.nombre,
    datos.correo,
    datos.carrera,
    datos.semestre
];

  db.query(sql, valores, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
};

const actualizar = (id, datos, callback) => {
  const sql = "UPDATE Alumno SET nombre = ?, correo = ?, carrera = ?, semestre = ? WHERE id_alumno = ?";
  const valores = [
    datos.nombre,
    datos.correo,
    datos.carrera,
    datos.semestre,
    id
  ];
  db.query(sql, valores, callback);
};

const eliminar = (id, callback) => {
  const sql = "DELETE FROM Alumno WHERE id_alumno = ?";
  db.query(sql, [id], callback);
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};
