const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {tituloWeb:"mi titulo dinamico"});
});
  
router.get('/servicios', (req, res) => {
  res.render('servicios', { tituloServicio: "Mi segundo titulo dinamico" });
});

module.exports = router;