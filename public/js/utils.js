/* exported utils */

var utils = {
  objForEach: objForEach,
  controlsBinder: controlsBinder
};

function objForEach(object, callbackFn) {
  for (var key in object) {
    // skip loop if the property is from prototype
    if (!object.hasOwnProperty(key)) continue;

    callbackFn(object[key], key);
  }
}

function controlsBinder(controls) {
  var controlsBindedObject = {};

  objForEach(controls, function(val, key) {
    if (!controlsBindedObject[val]) {
      controlsBindedObject[val] = [];
    }

    controlsBindedObject[val].push(key);
  });

  return controlsBindedObject;
}
