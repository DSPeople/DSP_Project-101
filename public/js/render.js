/* exported render */

// Funcion que renderiza el canvas
function render() {
  // clear the canvas
  ctx.clear();

  // Se crea el terreno
  _renderMap(CURRENT_MAP);

  // Se crea el jugador
  ctx.fillStyle = "#DDD";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Se crea el HUD
  lowerMenuCtx.fillStyle = "rgb(255, 215, 0)";
  lowerMenuCtx.strokeStyle = "black";
  lowerMenuCtx.font = "20pt Helvetica";
  lowerMenuCtx.textBaseline = "top";

  // Se inserta en el canvas del menu inferior la imagen cargada
  lowerMenuCtx.drawImage(lowerMenuImage, 0, 0);

  // Gold
  lowerMenuCtx.fillText(`G: ${player.gold}`, 20, 43);
  lowerMenuCtx.strokeText(`G: ${player.gold}`, 20, 43);

  // FPS
  lowerMenuCtx.fillStyle = "black";
  lowerMenuCtx.fillText(`FPS: ${fps}`, 20, 7);

  // Se crean los gameObjects
  ctx.fillStyle = "#0F0";
  for (var i = 0; i < gameObjects.length; i++) {
    ctx.fillRect(gameObjects[i].x, gameObjects[i].y, gameObjects[i].width, gameObjects[i].height);
  }
}

function _renderMap(map) {
  var terrainY = 0;
  for (var i = 0; i < MAPS[map].length; i++) {
    var file = MAPS[map][i];
    var terrainX = 0;

    for (var j = 0; j < file.length; j++) {
      var character = file[j];

      if (SPRITE_DEFINITIONS[CURRENT_TERRAIN_SPRITE][character]) {
        TERRAIN_TILES[CURRENT_TERRAIN_SPRITE][SPRITE_DEFINITIONS[CURRENT_TERRAIN_SPRITE][character][modifier]].render(terrainX, terrainY);
      }

      terrainX += Number(CONFIG.sprites.pixelPerSprite);
    }

    terrainY += Number(CONFIG.sprites.pixelPerSprite);
  }
}
