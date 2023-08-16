const { response } = require('express');
const path = require('path');

const uploadFile = async(req, res = response) => {
    if ( !req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        return res.status(400).json({
            msg: 'No hay archivos para subir.'
        });
    }

    const { archivo } = req.files;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[ nombreCortado.length - 1 ];

    /* Validamos la extensión */
    const extensionValidas = ['png', 'PNG', 'jpg', 'JPG', 'GIF', 'gif', 'jpeg'];

    if( !extensionValidas.includes( extension ) ) {
        return res.status(400).json({
            msg: `La extensión ${ extension } no es permitida. Extensiones permitidas: ${ extensionValidas }`
        });
    }

    res.json({
        extension
    })
    // const uploadPath = path.join( __dirname, '../uploads/', archivo.name );

    // archivo.mv(uploadPath, (err) => {
    //     if (err) {
    //         return res.status(500).json({ 
    //             err
    //         });
    //     }

    //     res.status(200).json({
    //         msg: `Archivo cargado: ${ archivo.name }`
    //     });
    // });
}

module.exports = {
    uploadFile
}