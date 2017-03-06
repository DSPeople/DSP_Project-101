/* exported update */

// Update game objects
function update(modifier) {

  var oldY, oldX, limit;

  // Se comprueba las teclas que pulsa el jugador
  // El jugador está pulsando up
  if (inputAction['up']) {
    oldY = player.y;
    player.y -= player.speed * modifier;

    if (player.y <= 0) {
      player.y = 0;
    } else {
      player.y = _checkCollisions(player, gameObjects, player.y, oldY);
    }
  }

  // El jugador está pulsando left
  if (inputAction['left']) {
    oldX = player.x;
    player.x -= player.speed * modifier;

    if (player.x <= 0) {
      player.x = 0;
    } else {
      player.x = _checkCollisions(player, gameObjects, player.x, oldX);
    }
  }

  // El jugador está pulsando down
  if (inputAction['down']) {
    oldY = player.y;
    player.y += player.speed * modifier;

    limit = canvas.height - player.height;
    if (player.y >= limit) {
      player.y = limit;
    } else {
      player.y = _checkCollisions(player, gameObjects, player.y, oldY);
    }
  }

  // El jugador está pulsando right
  if (inputAction['right']) {
    oldX = player.x;
    player.x += player.speed * modifier;

    limit = canvas.width - player.width;
    if (player.x >= limit) {
      player.x = limit;
    } else {
      player.x = _checkCollisions(player, gameObjects, player.x, oldX);
    }
  }

  // El jugador está pulsando action1
  if (inputAction['action1']) {
    //
  }
}

// Función que comprueba si un objeto está chocando con otro
function _checkCollisions(object, arrayOfObjects, newCoordinate, oldCoordinate) {
  var objectCoordinate;
  for (var i = 0; i < arrayOfObjects.length; i++) {
    // Se comprueba si la parte superior izq del obj1 está a la izq de la parte superior derecha del obj2
    // si la parte superior derecha del obj1 está a la derecha de la parte superior izq del obj2
    // si la parte superior izq del obj1 está encima de la parte inferior izq del obj2
    // si la parte inferior izq del obj1 está debajo de la parte superior izq del obj2
    if (
      object.x < arrayOfObjects[i].x + arrayOfObjects[i].width  && object.x + object.width  > arrayOfObjects[i].x &&
      object.y < arrayOfObjects[i].y + arrayOfObjects[i].height && object.y + object.height > arrayOfObjects[i].y
    ) {
      // Los objetos se tocan
      if (arrayOfObjects[i].collisionable) {
        objectCoordinate = oldCoordinate;
        // Si los objetos se chocan y el objeto es colisionable, se rompe el bucle para evitar dar vueltas innecesarias
        break;
      }

      if (arrayOfObjects[i].collectible) {
        arrayOfObjects.splice(i, 1);
        player.gold++;
      }

      if (arrayOfObjects[i].mob) {
        // TODO: Inicia combate

      }
    } else {
      objectCoordinate = newCoordinate;
    }
  }

  return objectCoordinate;
}
