/* exported CONFIG, EXTRA_RESOURCES, MAPS, SPRITE_DEFINITIONS, TERRAIN_TILES, player, gameObjects, modifier, controls */
var CONFIG, EXTRA_RESOURCES, MAPS, SPRITE_DEFINITIONS, TERRAIN_TILES = {}, player, gameObjects, modifier, controls, playerOriginalX, playerOriginalY;

// Carga de la configuracion
loadConfig().then(function(configFromServer) {
  CONFIG = configFromServer;

  // Bindea los controles
  if (CONFIG.controls) {
    controls = utils.controlsBinder(CONFIG.controls);
  }

  playerOriginalX = CONFIG.resolution.width / 2;
  playerOriginalY = CONFIG.resolution.height / 2;

  // Una vez se ha cargado la configuracion, se crea el canvas
  initCanvas(CONFIG.resolution);

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
