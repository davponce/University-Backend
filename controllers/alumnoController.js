const alumnoModel = require("../models/alumnoModel");

const obtenerAlumnos = (req, res) => {
  alumnoModel.obtenerTodos((error, resultado) => {
    if (error) {
        return res.status(500).json({ error: "Error al obtener los alumnos" });
    }
    res.json(resultado);
  });
};

const obtenerPorId = (req, res) => {
    const id = req.params.id;
    alumnoModel.obtenerPorId(id, (error, resultado) => {
  if (error) {
    return res.status(500).json({ error: "Error al obtener el alumno" });
  }

  if(resultado.length === 0){
    return res.status(404).json({ error: "Alumno no encontrado" });
  }

  res.json(resultado[0]);
});
};

const crearAlumno = (req, res) => {
    const datos = req.body;
    alumnoModel.crear(datos, (error, resultado) => {
        if (error) {
            return res.status(500).json({ error: "Error al crear el alumno" });
        }
        res.status(201).json({ message: "Alumno creado exitosamente", id: resultado.insertId });
    });
};

const actualizarAlumno = (req, res) => {
    const id = req.params.id;
    const datos = req.body;
    alumnoModel.actualizar(id, datos, (error, resultado) => {
        if (error) {
            return res.status(500).json({ error: "Error al actualizar el alumno" });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Alumno no encontrado" });
        }
        res.json({ message: "Alumno actualizado exitosamente" });
    });
};

const eliminarAlumno = (req, res) => {
    const id = req.params.id;
    alumnoModel.eliminar(id, (error, resultado) => {
        if (error) {
            return res.status(500).json({ error: "Error al eliminar el alumno" });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Alumno no encontrado" });
        }
        res.json({ message: "Alumno eliminado exitosamente" });
    });
};

module.exports = {
    obtenerAlumnos,
    obtenerPorId,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
};