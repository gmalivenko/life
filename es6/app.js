var Life = require('./lib/life.js');
var $ = require('jquery');
var GameController = require('./gameController.js');

var game = new GameController(16, 'plant.png', 'water.png', 0.5);

$(document).ready(() => {
  $('#helpHide').click(function() {
    $('#help').toggle();
    game.registerEvents();
  });

  game.domInit('#game', '#marker').then(function() {
    game.lifeCreate();
  });

});

$(window).resize(function() {
  game.domInit('#game', '#marker').then(function() {
    game.lifeCreate();
  });
});
