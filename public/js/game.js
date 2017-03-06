/* exported CONFIG, EXTRA_RESOURCES, MAPS, SPRITE_DEFINITIONS, TERRAIN_TILES, canvas, ctx, player, gameObjects, modifier, lowerMenuCanvas, lowerMenuCtx, lowerMenuImage, controls, playerOriginalX, playerOriginalY */
var CONFIG, EXTRA_RESOURCES, MAPS, SPRITE_DEFINITIONS, TERRAIN_TILES = {}, canvas, ctx, player, gameObjects, modifier, lowerMenuCanvas, lowerMenuCtx, lowerMenuImage, controls, playerOriginalX, playerOriginalY;

// Carga de la configuracion
loadConfig().then(function(configFromServer) {
  CONFIG = configFromServer;

  // Bindea los controles
  if (CONFIG.controls) {
    controls = utils.controlsBinder(CONFIG.controls);
  }

  // Se actualiza la configuracion de la resolucion teniendo en cuenta los pixeles por sprite
  CONFIG.resolution = _calculateMainCanvasResolution(CONFIG.resolution, CONFIG.sprites.pixelPerSprite);

  // Se guarda la posición original del jugador
  playerOriginalX = CONFIG.resolution.width / 2;
  playerOriginalY = CONFIG.resolution.height / 2;

  // Una vez se ha cargado la configuracion, se crea el canvas del juego
  canvas = createCanvas(CONFIG.resolution.width, CONFIG.resolution.height);
  ctx = canvas.getContext("2d");

  // Tambien hay que crear el canvas del menu inferior
  lowerMenuCanvas = createCanvas(CONFIG.resolution.width, CONFIG.resolution.lowerMenuHeight);
  lowerMenuCtx = lowerMenuCanvas.getContext("2d");

  // Se carga la imagen del menu inferior para despues poder insertarla en el canvas
  var image = new Image();
  image.src = `../assets/lower-menu/${CONFIG.resolution.width}x${CONFIG.resolution.height + CONFIG.resolution.lowerMenuHeight}.png`;
  image.onload = function() {
    lowerMenuImage = image;
  };


  loadExtraResources().then(function(extraResourcesFromServer) {
    EXTRA_RESOURCES = extraResourcesFromServer;

    loadMaps().then(function(mapsFromServer) {
      MAPS = mapsFromServer;

      loadSpriteDefinitions().then(function(spriteDefinitionsFromServer) {
        SPRITE_DEFINITIONS = spriteDefinitionsFromServer;

        // TODO: Cambiar función para poder cargar todos los sprites de un array de nombres de ficheros
        loadSprite("../assets/terrain.png", Number(CONFIG.sprites.pixelPerSprite)).then(function(data) {
          TERRAIN_TILES[CURRENT_TERRAIN_SPRITE] = data;

          modifier = "day";

          // Player
          // playerWidth, playerHeight, playerX, playerY, playerGold, playerSpeed
          player = new DSP_Player(40, 80, playerOriginalX, playerOriginalY, 0, 500);

          // Objetos
          // objectWidth, objectHeight, objectX, objectY, collisionable, collectible
          gameObjects = [
            new DSP_StaticObject(200, 300, 200, 200, true, false),
            new DSP_StaticObject(100, 100, 500, 600, false, true),
            new DSP_StaticObject(100, 100, 800, 600, false, false),
            new DSP_StaticObject(600, 100, 500, 150, true, false)
          ];

          // Cuando ya ha cargado todo se inicializa el juego
          initGame();
        });
      });
    });
  });
});

function _calculateMainCanvasResolution(resolution, pixelPerSprite) {
  var mainCanvasHeight = pixelPerSprite * 10;

  resolution.lowerMenuHeight = resolution.height - mainCanvasHeight;
  resolution.height = mainCanvasHeight;

  return resolution;
}
