const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Paciente = require('../models/paciente');


router.get('/', async (req, res) => {
      try {
          const listaPacienteDB = await Paciente.find();
          console.log(listaPacienteDB);
          res.render('pacientes', {
            listaPacientes: listaPacienteDB
          });
      } catch (error) {
          console.log(error);
        }  
})   

router.get('/crear', (req, res) =>{
  res.render('crear')
})
router.post('/', async(req, res) => {
  const body = req.body
  console.log(body)
  try {
    const pacienteDB = new Paciente(body)
    await pacienteDB.save()
    res.redirect('/pacientes')
} catch (error) {
    console.log('error', error)
}
})
router.get('/:id', async (req, res) => {
  
  const id = req.params.id

  try {
      const pacienteDB = await Paciente.findOne({_id: id})
      console.log(pacienteDB)

      res.render('detalle', {
        paciente: pacienteDB,
        error: false
      })
  } catch (error) {
      console.log(error)
      res.render('detalle', {
        error: true,
        mensaje: 'No se encuentra el paciente seleccionado'
      })
    }
})
router.delete('/:id', async(req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id.trim());

  try {
      const pacienteDB = await Paciente.findByIdAndDelete({_id: id})

      if (pacienteDB) {
        res.json({
          estado: true,
          mensaje: 'Eliminado!'
        })
      } else {
        res.json({
          estado: false,
          mensaje: 'fallo eliminar'
        })
      }} catch (error) {
    console.log(error)
    }
})

router.put('/:id', async(req, res) => {
  const id = req.params.id
  const body = req.body
 
  try {
      const pacienteDB = await Paciente.findByIdAndUpdate(id, body, { useUnifiedTopology: false })
      console.log(pacienteDB)
      
      res.json({
        estado: true,
        mensaje: 'Editado'
      })
      } catch (error) {
    console.log(error)
    
    res.json({
      estado: false,
      mensaje: 'Falló'
    })
  }
})

module.exports = router;