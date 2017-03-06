var express = require("express");
var utils = require('./utils');
var parser = require('./parser');
var BrowserWindow = require('electron').BrowserWindow;
var router = new express.Router();
var globalObjects = require('./globalObjects');

// Devuelve la version de la aplicacion
router.get("/version", function(req, res) {
  res.json({
    version: "0.0.1"
  });
});

// Devuelve un objeto que representa la configuracion
router.get("/configLoader", function(req, res) {
  var configObject = {};

  utils.readFilesFromFolder('server/config/', function(content) {
    // Se hace un foreach sobre el objeto devuelto al leer todos los ficheros de un directorio
    utils.objForEach(content, function(value, key) {
      // Se rellena el objeto que va a devolver el servicio, formateando su contenido
      configObject[key.split(".")[0]] = parser.configToObject(value);
    });

    res.send(configObject);
  }, function(err) {
    res.send(err);
    throw err;
  });
});

// Devuelve un objeto que contiene todos los mapas cargados
router.get("/mapsLoader", function(req, res) {
  var mapsObject = {};

  utils.readFilesFromFolder('server/maps/', function(content) {
    // Se hace un foreach sobre el objeto devuelto al leer todos los ficheros de un directorio
    utils.objForEach(content, function(value, key) {
      // Se rellena el objeto que va a devolver el servicio, formateando su contenido
      mapsObject[key.split(".")[0]] = parser.mapToArray(value);
    });

    res.send(mapsObject);
  }, function(err) {
    res.send(err);
    throw err;
  });
});

// Devuelve un objeto que representa la definicion de los sprites
router.get("/spriteDefinitionsLoader", function(req, res) {
  var spriteDefinition = {};

  utils.readFilesFromFolder('server/spriteDefinitions/', function(content) {
    // Se hace un foreach sobre el objeto devuelto al leer todos los ficheros de un directorio
    utils.objForEach(content, function(value, key) {
      // Se rellena el objeto que va a devolver el servicio, formateando su contenido
      spriteDefinition[key.split(".")[0]] = parser.jsonParse(value);
    });

    res.send(spriteDefinition);
  }, function(err) {
    res.send(err);
    throw err;
  });
});

// Devuelve un objeto que representa la definicion de los sprites
router.get("/extraResourcesLoader", function(req, res) {
  var extraResources = {};

  utils.readFilesFromFolder('server/extraResources/', function(content) {
    // Se hace un foreach sobre el objeto devuelto al leer todos los ficheros de un directorio
    utils.objForEach(content, function(value, key) {
      // Se rellena el objeto que va a devolver el servicio, formateando su contenido
      // comprobando su extensión

      if (key.split(".")[1] === "json") {
        extraResources[key.split(".")[0]] = parser.jsonParse(value);
      }/* else if (key.split(".")[1] === "conf") {                              // NOTE: En caso de existir otro tipo de fichero "extra"
        extraResources[key.split(".")[0]] = parser.configToObject(value);
      }*/
    });

    res.send(extraResources);
  }, function(err) {
    res.send(err);
    throw err;
  });
});

// Abre la ventana con la app
router.get("/openWindow", function(req, res) {
  console.log(`Width: ${req.query.width}`);
  console.log(`Height: ${req.query.height}`);

  var win = globalObjects.getWindowApp();

  win.setSize(Number(req.query.width) + 35, Number(req.query.height) + 75);
  win.show();

  res.send();
});

module.exports = router;
