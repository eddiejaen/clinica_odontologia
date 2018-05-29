"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
var board_service_1 = require("../../services/board.service");
// set game constants
var NUM_PLAYERS = 1;
var BOARD_SIZE = 48;
var BoardComponent = /** @class */ (function () {
    function BoardComponent(_vcr, boardService) {
        this._vcr = _vcr;
        this.boardService = boardService;
        this.gameUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
        this.createBoards();
    }
    // event handler for click event on
    // each tile - fires torpedo at selected tile
    BoardComponent.prototype.fireTorpedo = function (e) {
        var id = e.target.id, boardId = id.substring(1, 2), row = id.substring(2, 3), col = id.substring(3, 4), tile = this.boards[boardId].tiles[row][col];
        if (!this.checkValidHit(boardId, tile)) {
            return;
        }
        // this.toastr.success("You got this.", "HURRAAA! YOU SANK A SHIP!");
        this.boards[boardId].tiles[row][col].used = true;
        this.boards[boardId].tiles[row][col].value = "X";
        return this;
    };
    BoardComponent.prototype.checkValidHit = function (boardId, tile) {
        if (tile.value == "X") {
            // this.toastr.error("Don't waste your torpedos.", "You already shot here.");
            return false;
        }
        return true;
    };
    BoardComponent.prototype.createBoards = function () {
        this.boardService.createBoard(BOARD_SIZE);
        return this;
    };
    Object.defineProperty(BoardComponent.prototype, "boards", {
        // winner property to determine if a user has won the game.
        // once a user gets a score higher than the size of the game
        // board, he has won.
        // get all boards and assign to boards property
        get: function () {
            return this.boardService.getBoards();
        },
        enumerable: true,
        configurable: true
    });
    BoardComponent = __decorate([
        core_1.Component({
            selector: 'app-root2',
            templateUrl: './board.component.html',
            styleUrls: ['./board.component.css'],
            providers: [board_service_1.BoardService]
        })
    ], BoardComponent);
    return BoardComponent;
}());
exports.BoardComponent = BoardComponent;
