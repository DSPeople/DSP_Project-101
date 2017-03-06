// Handle keyboard controls
var inputAction = {};

addEventListener("keydown", function (e) {
  _updateInputAction(e.keyCode, true);
}, false);

addEventListener("keyup", function (e) {
  _updateInputAction(e.keyCode, false);
}, false);

function _updateInputAction(keyCode, addKey) {
  var keyName;

  if (CONFIG) {
    keyName = CONFIG.keymap[keyCode];

    if (keyName && controls[keyName]) {

      for (var i = 0; i < controls[keyName].length; i++) {
        if (addKey) {
          inputAction[controls[keyName][i]] = true;
        } else {
          delete inputAction[controls[keyName][i]];
        }
      }
    }
  }
}
