var express = require("express");
var utils = require('./utils');
var router = new express.Router();

// Devuelve la version de la aplicacion
router.get("/version", function(req, res) {
  res.json({
    version: "0.0.1"
  });
});

// Devuelve un objeto que representa la configuracion
router.get("/configLoader", function(req, res) {
  var configObject = {};

  utils.readFilesFromFolder('config/', function(content) {
    // Se hace un foreach sobre el objeto devuelto al leer todos los ficheros de un directorio
    utils.objForEach(content, function(value, key) {
      // Se rellena el objeto que va a devolver el servicio, formateando su contenido
      configObject[key.split(".")[0]] = _configToObject(value);
    });

    res.send(configObject);
  }, function(err) {
    res.send(err);
    throw err;
  });

  // Función que se utiliza para formatear el contenido de un fichero de configuracion
  function _configToObject(config) {
    var object = {}, lines = config.split("\n");

    for (var i = 0; i < lines.length; i++) {
      if (lines[i]) {
        var property = lines[i].split("=")[0];
        var value = lines[i].split("=")[1];

        // Si value tiene comas, se convierte a array
        if (value.split(",").length > 1) {
          value = value.split(",");
        }

        object[property] = value;
      }
    }

    return object;
  }
});

// Devuelve un objeto que contiene todos los mapas cargados
router.get("/mapsLoader", function(req, res) {
  var mapsObject = {};

  utils.readFilesFromFolder('maps/', function(content) {
    // Se hace un foreach sobre el objeto devuelto al leer todos los ficheros de un directorio
    utils.objForEach(content, function(value, key) {
      // Se rellena el objeto que va a devolver el servicio, formateando su contenido
      mapsObject[key.split(".")[0]] = _mapToArray(value);
    });

    res.send(mapsObject);
  }, function(err) {
    res.send(err);
    throw err;
  });

  // Función que se utiliza para formatear el contenido de un fichero de configuracion
  function _mapToArray(map) {
    var array = map.split("\n");

    for (var i = 0; i < array.length; i++) {
      array[i] = array[i].split(" ").join("");

      if (array[i].split("").length <= 1) {
        array.splice(i, 1);
        i--;
      }
    }

    return array;
  }
});

// Devuelve un objeto que representa la definicion de los sprites
router.get("/spriteDefinitionsLoader", function(req, res) {
  var spriteDefinition = {};

  utils.readFilesFromFolder('spriteDefinitions/', function(content) {
    // Se hace un foreach sobre el objeto devuelto al leer todos los ficheros de un directorio
    utils.objForEach(content, function(value, key) {
      // Se rellena el objeto que va a devolver el servicio, formateando su contenido
      spriteDefinition[key.split(".")[0]] = _jsonToSpriteDefinition(value);
    });

    res.send(spriteDefinition);
  }, function(err) {
    res.send(err);
    throw err;
  });

  function _jsonToSpriteDefinition(json) {
    return JSON.parse(json);
  }
});

module.exports = router;
