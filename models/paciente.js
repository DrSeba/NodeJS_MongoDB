const mongoose = require('mongoose');
const { Schema } = mongoose;
const pacienteSchema = new Schema({ 
    nombre: String, 
    apellido: String, 
    dni: Number, 
    obraSocial: String, 
    fechaNacimiento: Number,
 });

const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;