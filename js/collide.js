/**
 * Collide.js - A simple collision detection experiment
 * coded with ♥ by Niccolò Mineo
 * www.niccolomineo.com
 * © 2016
 */

/**
 * INSTRUCTIONS TO BUILD THE MAP
 * Edit example in ./data/map.txt
 * > The map must be a rectangle or a square
 * > Use:
 * * - X to put walls and delimit your space
 * * - O to mark user start position
 * * - a space to mark walkable floor space
 */

var fileName = 'map';

/**
 * MAP ENGINE
 */

(function(fileName) {
  var file = new XMLHttpRequest();
  file.open('GET', './data/' + fileName + '.txt', true);
  file.onreadystatechange = function() {
    if (file.readyState === 4) {
      if (file.status === 200 || file.status == 0) {

        var O = '\u25B8',
          X = '8',
          floor = '\u00A0',
          responseText = file.responseText,
          map = responseText.replace(/\n/g, '').split(''),
          mapWidth = responseText.replace(/\,/g, '').split('\n')[0].length,
          mapWidthRegEx = '(.{' + mapWidth + '})',
          mapWidthRegExInstance = new RegExp(mapWidthRegEx, "g"),
          userPos = map.indexOf('O'),
          moveToPos,
          keyDownText = document.getElementById('pressedKeys'),
          mapText = document.getElementById('map'),
          e = e || window.event;

        for (i = 0; i < map.length; i++) {
          map[i] === 'O' ? map[i] = O : map[i];
          map[i] === 'X' ? map[i] = X : map[i];
          map[i] === ' ' ? map[i] = floor : map[i];
        }
      console.log(responseText, map);
        mapText.textContent = map.join('').replace(mapWidthRegExInstance, '$1\n'); // flattens map, adds new line every 15 chars and draws the whole thing

        document.onkeydown = function(e) {

          switch (e.keyCode) {
            case 37:
              moveToPos = map.indexOf(O) - 1;
              O = '\u25C2';
              keyDownText.textContent = 'left';
              break;
            case 38:
              moveToPos = map.indexOf(O) - mapWidth;
              O = '\u25B4';
              keyDownText.textContent = 'up';
              break;
            case 39:
              moveToPos = map.indexOf(O) + 1;
              O = '\u25B8';
              keyDownText.textContent = 'right';
              break;
            case 40:
              moveToPos = map.indexOf(O) + mapWidth;
              O = '\u25BE';
              keyDownText.textContent = 'down';
              break;
          }

          map.splice(userPos, 1, floor); // remove user from previous position

          if (map.join('').charAt(moveToPos) != X) {
            map.splice(moveToPos, 1, O); // move user to new position
            userPos = moveToPos;
          } else {
            map.splice(userPos, 1, O); // keep user in the same position
          }

          mapText.textContent = map.join('').replace(mapWidthRegExInstance, "$1\n");

        }

      }
    }
  }
  file.send(null);
})(fileName);