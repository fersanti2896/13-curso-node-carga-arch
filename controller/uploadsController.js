const { response } = require('express');

const uploadFile = async(req, res = response) => {
    res.status(200).json({
        msg: 'Cargando Archivo'
    })
}

module.exports = {
    uploadFile
}