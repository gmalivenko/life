'use strict';

var _ = require('lodash');
var Life = require('./lib/life.js');
var $ = require('jquery');

class GameController {
  constructor(tilesize, plantTexture, waterTexture, density) {
    this.tilesize = tilesize;
    this.plantTexture = plantTexture;
    this.waterTexture = waterTexture;
    this.density = density;

    this._lclick = 0;
    this._rclick = 0;

  };

  lifeCreate() {
    console.log('Creating life object...');
    this.life = new Life(Math.ceil(this.h / this.tilesize), Math.ceil(this.w / this.tilesize));
    this.life.randomize(0.5);
  }

  domInit(canvasId, markerId) {
    this.w = $(window).width();
    this.h = $(window).height();

    console.log('Init DOM...');
    this.canvasId = canvasId;
    this.markerId = markerId;

    console.log('Creating canvas context...');
    this.canvas = $(this.canvasId).get(0);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width  = this.w;
    this.canvas.height = this.h;

    return this._loadResources()
      .then(_.bind(this.lifeCreate, this))
      .then(_.bind(this.render, this));
  };

  render() {
    for (var lineIndex = 0; lineIndex < this.life._field.length; lineIndex++) {
      for (var columnIndex = 0; columnIndex < this.life._field[lineIndex].length; columnIndex++) {
        this._drawCell(lineIndex, columnIndex, this.life._field[lineIndex][columnIndex]);
      }
    }
  };

  registerEvents() {
    console.log('loading events...');
    $(document).mousedown(_.bind(this._mousedownEvent, this));
    $(document).on('mouseup', _.bind(this._mouseupEvent, this));
    $(document).mousemove(_.bind(this._mousemoveEvent, this));
    $(document).on('keydown', _.bind(this._keydownEvent, this));

    $(document).bind('contextmenu', (e) => {
      return false;
    });

    return Promise.resolve();
  };

  _loadResources() {
    this.water = new Image();
    this.plant = new Image();

    return new Promise((resolve, reject) => {
      this.water.src = this.waterTexture;
      this.water.onload = () => {
        this.plant.src = this.plantTexture;
        this.plant.onload = () => {
          console.log('images loaded :)');
          resolve();
        };
      };
    });
  };

  _drawCell(i, j, alive) {
    if (alive) {
      this.ctx.drawImage(this.plant, i * this.tilesize, j * this.tilesize);
    } else {
      this.ctx.drawImage(this.water, i * this.tilesize, j * this.tilesize);
    }
  };

  _mousedownEvent(e) {
    var x = Math.floor((e.pageX - $(this.canvasId).offset().left) / this.tilesize);
    var y = Math.floor((e.pageY - $(this.canvasId).offset().top) / this.tilesize);

    if (e.button == 2) {
      this.life._field[x][y] = 0;
      this._drawCell(x, y, 0);
      this.rclick = 1;
      return false;
    } else {
      this.life._field[x][y] = 1;
      this._drawCell(x, y, 1);
      this.lclick = 1;
      return true;
    }
  }

  _mouseupEvent(e) {
    this.lclick = 0;
    this.rclick = 0;
  }

  _mousemoveEvent(e) {
    var x = Math.floor((e.pageX - $(this.canvasId).offset().left) / this.tilesize);
    var y = Math.floor((e.pageY - $(this.canvasId).offset().top) / this.tilesize);

    var pos = $(this.markerId).offset();
    pos.left = x * this.tilesize;
    pos.top = y * this.tilesize;
    $(this.markerId).offset(pos);

    if (this.lclick) {
      this.life._field[x][y] = 1;
      this._drawCell(x, y, 1);
    } else if (this.rclick) {
      this.life._field[x][y] = 0;
      this._drawCell(x, y, 0);
    }
  }

  _keydownEvent(e) {
    switch (e.keyCode) {
      case 32:
        this.life.iterate();
        this.render();
        break;
      case 82:
        this.life.randomize(this.density);
        this.render();
        break;
      case 90:
        this.life.zeros();
        this.render();
        break;
      default:
    }
  };

};

module.exports = GameController;
