let Life = require('./lib/life.js')
let $ = require('jquery')
let GameController = require('./gameController.js')

let game = new GameController(32, 'plant.png', 'water.png', 0.5)

$(document).ready(() => {
  $('#helpHide').click(function() {
    $('#help').toggle()
    game.registerEvents()
  })

  game.domInit('#game', '#marker').then(function() {
    game.lifeCreate()
  })

})

$(window).resize(function() {
  game.domInit('#game', '#marker').then(function() {
    game.lifeCreate()
  })
})
