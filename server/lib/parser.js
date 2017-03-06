module.exports = {
  configToObject: configToObject,
  mapToArray: mapToArray,
  jsonParse: jsonParse
};

// Función que se utiliza para formatear el contenido de un fichero de configuracion
function configToObject(config) {
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

// Función que se utiliza para formatear el contenido de un fichero de configuracion
function mapToArray(map) {
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

// Función que se utiliza para pasar un fichero leído a JSON
// NOTE: HAY ALGUN PROBLEMA AL LEER STRINGS DE UN JSON
function jsonParse(json) {
  return JSON.parse(json);
}
