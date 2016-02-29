/**
* Collide.js - A simple collision detection experiment
* coded with ♥ by Niccolò Mineo
* www.niccolomineo.com
* © 2016
*/

/**
* INSTRUCTIONS TO BUILD THE MAP
* > The array must be a rectangle or a square
* > In the array, use:
* * - X to put walls and delimit your space
* * - O to mark user start position
* * - Space to mark walkable space
* > Adjust mapWidth variable to the number of columns in array
*/

var O = '\u25B8',
X = '8',
map = [
X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,
X, , , ,X,X, , , ,X,X, , , ,X,
X, , , , , , , , , , , , , ,X,
X, , , , , , ,O, , , , , , ,X,
X, , , ,X,X, , , ,X,X, , , ,X,
X,X,X,X,X,X,X,X,X,X,X,X,X,X,X
],
mapWidth = 15,
floor = '\u00A0',
keyDownText = document.getElementById('pressedKeys'),
mapText = document.getElementById('map'),
moveToPos,
userPos = map.indexOf(O),
e = e || window.event,
mapWidthRegEx = '(.{' + mapWidth + '})',
mapWidthRegExInstance = new RegExp(mapWidthRegEx, "g");

for (i=0; i < map.length; i++) {
  map[i] === undefined ? map[i] = floor : map[i];
}

mapText.innerText = map.join('').replace(mapWidthRegExInstance,'$1\n'); // flattens map, adds new line every 15 chars and draws the whole thing

document.onkeydown = function(e) {

  switch (e.keyCode) {
    case 37:
    moveToPos = map.indexOf(O) - 1;
    O = '\u25C2';
    keyDownText.innerText = 'left';
    break;
    case 38:
    moveToPos = map.indexOf(O) - mapWidth;
    O = '\u25B4';
    keyDownText.innerText = 'up';
    break;
    case 39:
    moveToPos = map.indexOf(O) + 1;
    O = '\u25B8';
    keyDownText.innerText = 'right';
    break;
    case 40:
    moveToPos = map.indexOf(O) + mapWidth;
    O = '\u25BE';
    keyDownText.innerText = 'down';
    break;
  }

  map.splice(userPos, 1, floor); // remove user from previous position

  if (map.join('').charAt(moveToPos) != X) {
    map.splice(moveToPos, 1, O); // move user to new position
    userPos = moveToPos;
  } else {
    map.splice(userPos, 1, O); // keep user in the same position
  }

  mapText.innerText = map.join('').replace(mapWidthRegExInstance,"$1\n");

}
