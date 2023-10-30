const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
// const { validationResult } = require('express-validator');

const usuariosGet = async ( req = request, res = response ) => {

    // const query = req.query; 
    // const { q, nombre = 'no name', apikey, page = 1, limit } = req.query; // desestructurando
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }
    // const usuarios = await Usuario.find(query)
    //     .skip(Number( desde ))
    //     .limit(Number( limite ));

    // const total = await Usuario.countDocuments(query);

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number( desde ))
            .limit(Number( limite ))
    ])
    
    res.json({
        // msg: 'get API - Controlador',
        // // query
        // q,
        // nombre,
        // apikey,
        // page,
        // limit

        total,
        usuarios
        // resp
    });
}

const usuariosPost = async (req, res = response ) => {

    // const errors = validationResult(req);
    // if ( !errors.isEmpty() ) {
    //     return res.status(400).json(errors)
    // }
    // const { nombre, edad} = req.body;
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // // Verificar si existe correo
    // const existeEmail = await Usuario.findOne({ correo });
    // if (existeEmail) {
    //     return res.status(400).json({
    //         msg: 'Correo ya está registrado'
    //     })
    // }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    // Guardar en la DB
    await usuario.save();

    res.json({
        // msg: 'post API - Controlador',
        // nombre,
        // edad
        usuario,
    });
}

const usuariosPut = async (req, res = response ) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validar contra base de datos
    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
}

const usuariosPatch = (req, res = response ) => {
    res.json({
        msg: 'patch API - Controlador'
    });
}

const usuariosDelete = async (req, res = response ) => {

    const { id } = req.params;
    // Fisicamente lo borramos 
    // const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}