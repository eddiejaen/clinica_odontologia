"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var board_1 = require("../class/board");
var player_1 = require("../class/player");
var BoardService = /** @class */ (function () {
    function BoardService() {
        this.playerId = 1;
        this.boards = [];
    }
    // method for creating a board which takes
    // an optional size parameter that defaults to 5
    BoardService.prototype.createBoard = function (size) {
        if (size === void 0) { size = 19; }
        // create tiles for board
        var tiles = [];
        for (var i = 0; i < size; i++) {
            tiles[i] = [];
            for (var j = 0; j < size; j++) {
                tiles[i][j] = { used: false, value: 0, status: '' };
            }
        }
        // generate random ships for the board
        for (var i = 0; i < size * 2; i++) {
            tiles = this.randomShips(tiles, size);
        }
        // create board
        var board = new board_1.Board({
            player: new player_1.Player({ id: this.playerId++ }),
            tiles: tiles
        });
        // append created board to `boards` property
        this.boards.push(board);
        return this;
    };
    // function to return the tiles after a value
    // of 1 (a ship) is inserted into a random tile
    // in the array of tiles
    BoardService.prototype.randomShips = function (tiles, len) {
        len = len - 1;
        var ranRow = this.getRandomInt(0, len), ranCol = this.getRandomInt(0, len);
        if (tiles[ranRow][ranCol].value == 1) {
            return this.randomShips(tiles, len);
        }
        else {
            tiles[ranRow][ranCol].value = 1;
            return tiles;
        }
    };
    // helper function to return a random
    // integer between ${min} and ${max}
    BoardService.prototype.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    // returns all created boards
    BoardService.prototype.getBoards = function () {
        return this.boards;
    };
    BoardService = __decorate([
        core_1.Injectable()
    ], BoardService);
    return BoardService;
}());
exports.BoardService = BoardService;
