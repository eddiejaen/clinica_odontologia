"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player(values) {
        if (values === void 0) { values = {}; }
        this.score = 0;
        Object.assign(this, values);
    }
    return Player;
}());
exports.Player = Player;
