const { response } = require('express');
const { uploadFile } = require('../helpers');

const uploadFileServer = async(req, res = response) => {
    if ( !req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        return res.status(400).json({
            msg: 'No hay archivos para subir.'
        });
    }

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
        })
    }

    
}

module.exports = {
    uploadFileServer
}