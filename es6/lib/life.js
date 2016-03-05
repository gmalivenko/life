'use strict';

var _ = require('lodash');

class Life {
  _getNeighboorsCount(i0, j0) {
    let sum = 0;
    if (this._field[i0 - 1]) {
      sum = this._field[i0 - 1][j0 - 1] +  this._field[i0 - 1][j0] + this._field[i0 - 1][j0 + 1];
    }

    if (this._field[i0 + 1]) {
      sum += this._field[i0 + 1][j0 - 1] +  this._field[i0 + 1][j0] + this._field[i0 + 1][j0 + 1];
    }

    return sum + this._field[i0][j0 - 1] + this._field[i0][j0 + 1];
  };

  constructor(width, height) {
    this._height = height;
    this._width = width;
    this.zeros();
  };

  zeros() {
    this._field = _.map(Array(this._height), () => {
      return _.fill(Array(this._width), 0);
    });
  };

  randomize(density) {
    this._field.forEach((line, lineIndex, lineArray) => {
      line.forEach((cell, columnIndex, columnArray) => {
        columnArray[columnIndex] = (Math.random() >= (1.0 - density)) ? 1 : 0;
      });
    });
  };

  iterate() {
    var iteratedField = [];

    for (var lineIndex = 0; lineIndex < this._field.length; lineIndex++) {
      iteratedField[lineIndex] = [];
      for (var columnIndex = 0; columnIndex < this._field[lineIndex].length; columnIndex++) {
        let currentCellNeighboors = this._getNeighboorsCount(lineIndex, columnIndex);
        if (currentCellNeighboors == 3) {
          iteratedField[lineIndex][columnIndex] = 1;
        } else if (currentCellNeighboors == 2 &&  this._field[lineIndex][columnIndex] == 1) {
          iteratedField[lineIndex][columnIndex] = 1;
        } else {
          iteratedField[lineIndex][columnIndex] = 0;
        }
      }
    }

    this._field = iteratedField;
  }

};

module.exports = Life;
