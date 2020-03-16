console.log("Servidor Inicializado");
const fs = require('fs');
const express = require('express');
const app = express();
const puerto = process.env.PORT || 8181;

const dirTree = require("directory-tree");
let data ;
//const fs = require('fs');



app.use(express.static(__dirname + '/public'));

app.get('/resultado.json', (req, res) => {

  console.log('Creando arbol de carpetas');
  data = JSON.stringify(dirTree('.\\content'));
  fs.writeFile('resultado.json', data, err => {
    if (err) {
      console.log('Error al escribir en el archivo', err)
    } else {
      console.log('Archivo guardado.')
    }
  });

  
  res.send(data);
});

app.listen(puerto, () => {
  console.log(`Escuchado peticiones en el puerto ${puerto}`);

});
