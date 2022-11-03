const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config()

const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.j9nwt.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log(e))

const port = process.env.PORT || 8080;


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./router/RutasWeb'));
app.use('/pacientes', require('./router/Pacientes'));

app.use((req, res, next) => {
  res.status(404).render('404', {
    titulo: "404",
    descripcion: "titulo del sitio web",
  });
});

const server = app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

server.on("error", (error) => {
  console.log("Error en el servidor:", error);
});