const { response } = require('express');
const { uploadFile } = require('../helpers');
const { Usuario, Producto } = require('../models');
const { validarArchivo } = require('../middlewares');

const uploadFileServer = async(req, res = response) => {
    try {
        /* Validamos la extensión */
        // const extensionValidas = ['txt', 'pdf'];

        const nombreImg = await uploadFile( req.files, undefined, 'imgs' );

        res.status(201).json({
            nombreImg
        });
    } catch (msg) {
        console.log(msg);

        res.status(400).json({
            msg
        });
    }   
}

const updateImage = async(req, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById( id );

            if( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }.`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById( id );
    
            if( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }.`
                });
            }
            break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto.' })
    }

    const nombre = await uploadFile( req.files, undefined, coleccion );
    modelo.img = nombre;

    await modelo.save();

    res.status(200).json({
        modelo
    })
}

module.exports = {
    updateImage,
    uploadFileServer
}