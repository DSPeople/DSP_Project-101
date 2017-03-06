module.exports = {
  saveWindowApp: saveWindowApp,
  getWindowApp: getWindowApp
};

var windowApp;

function saveWindowApp(data) {
  windowApp = data;
}

function getWindowApp() {
  return windowApp;
}
