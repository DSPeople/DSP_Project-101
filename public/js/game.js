/* exported player, staticObjects */

// Declaración de los objetos del juego

  // Player
  // playerWidth, playerHeight, playerX, playerY, playerMoney, playerSpeed
  var player = new DSP_Player(40, 80, playerOriginalX, playerOriginalY, 0, 500);

  // Objetos
  // objectWidth, objectHeight, objectX, objectY, collisionable, collectible
  var staticObjects = [
    new DSP_StaticObject(200, 300, 200, 200, true, false),
    new DSP_StaticObject(100, 100, 500, 600, false, true),
    new DSP_StaticObject(100, 100, 800, 600, false, false),
    new DSP_StaticObject(600, 100, 500, 150, true, false)
  ];
