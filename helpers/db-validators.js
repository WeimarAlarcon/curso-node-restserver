const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${rol} no está registrado en BD`);
    }

}

const existeEmail = async ( correo = '' )=> {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        // return res.status(400).json({
        //     msg: 'Correo ya está registrado'
        // })
        throw new Error(`El correo ${correo} ya está registrado en BD`);
    }
}

const existeUsuarioPorId = async ( id )=> {
    const existeUsuario = await Usuario.findById( id );
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId
}