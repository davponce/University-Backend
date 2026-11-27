const bcrypt = require('bcrypt');
const usuarioModel = require('../models/usuarioModel');
const jwt = require('jsonwebtoken');    

const registrar = async (req, res) => {
    try {
        const { Nombre, Correo, Password } = req.body;

        if(!Nombre || !Correo || !Password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const hash = await bcrypt.hash(Password, 10);
        usuarioModel.crearUsuario(Nombre, Correo, hash, (error, resultado) => {
            if (error) {
                if(error.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({mensaje: "El correo ya está registrado"});
                }
                return res.status(500).json({mensaje: "Error al registrar el usuario"});
            }
            res.status(201).json({mensaje: "Usuario registrado exitosamente", id: resultado.insertId});
        });

} catch (error) {
        res.status(500).json({mensaje: "Error interno del servidor"});
    }
};

const login = (req, res) => { 
    const { Correo, Password } = req.body; 
    if (!Correo || !Password) { 
        return res.status(400).json({ 
            mensaje: 'Correo y contraseña son obligatorios' 
        }); } 
        usuarioModel.buscarPorCorreo(Correo, async (error, resultados) => 
            { if (error) { return res.status(500).json({ 
                mensaje: 'Error al buscar el usuario' }); 
            } 
            if (resultados.length === 0) { 
                return res.status(401).json({ 
                    mensaje: 'Credenciales incorrectas' }); 
                } 
                const usuario = resultados[0]; 
                const passwordCorrecta = await bcrypt.compare( Password, usuario.Password ); 
                if (!passwordCorrecta) { return res.status(401).json({ 
                    mensaje: 'Credenciales incorrectas' }); 
                } 
                const token = jwt.sign( { 
                    id: usuario.id, correo: usuario.Correo 
                },
                 process.env.JWT_SECRET, { 
                    expiresIn: '1h' 
                } ); 
                res.json({ mensaje: 'Inicio de sesión correcto',
                     token: token, 
                     usuario: { id: usuario.id, 
                        nombre: usuario.Nombre,
                        correo: usuario.Correo } 
                    });
                 });
                 };

module.exports = {
    registrar,
    login
};  