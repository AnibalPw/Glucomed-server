const { Schema, model } = require('mongoose')

const glucosaSchema = new Schema({
    idUsuario: String,
    glucosa: Number,
    nivelGlucosa: String,
    dia: String,
    hora: String,
},
{
    timestamps: true //Con timestamp mongo se va a encargar de agregar la fecha de creación y de actualización
});


module.exports = model('Glucosa', glucosaSchema)