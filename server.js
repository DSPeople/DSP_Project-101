// configuration    =============================================================================================================================
  // Load required modules
  var http          = require('http');    // http server core module
  var express       = require('express'); // web framework external module
  var api           = require('./server/lib/api');     // api
  var electronApp   = require('electron').app;
  var BrowserWindow = require('electron').BrowserWindow;
  var proc          = require('child_process');
  var globalObjects = require('./server/lib/globalObjects');
  var httpApp       = express();

  console.log(electronApp);

  // Start Express http server on port 3000
  var webServer = http.createServer(httpApp).listen(3000);

  // Setup and configure Express http server. Expect a subfolder called "public" to be the web root.
  httpApp.use("/", express.static("./public"));
  httpApp.use("/api", api);

  electronApp.on('ready', function() {
    var win = new BrowserWindow({ width: 600, height: 400, show: true, resizable: false });
    win.on('close', function () { win = null });
    win.loadURL("http://localhost:3000");
    globalObjects.saveWindowApp(win);
  });
