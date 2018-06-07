"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var odontogram_1 = require("../class/odontogram");
var http_1 = require("@angular/http");
var OdontogramService = /** @class */ (function () {
    function OdontogramService(authService, http) {
        this.authService = authService;
        this.http = http;
        this.odontograms = [];
        this.clickable = [];
        this.pieces = [];
        this.domain = this.authService.domain;
    }
    OdontogramService.prototype.createAuthenticationHeaders = function () {
        this.authService.loadToken(); // Get token so it can be attached to headers
        // Headers configuration options
        this.options = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Content-Type': 'application/json',
                'authorization': this.authService.authToken // Attach token
            })
        });
    };
    OdontogramService.prototype.checkCedula = function (cedula) {
        this.createAuthenticationHeaders(); // Create headers
        return this.http.get(this.domain + 'patients/checkCedula/' + cedula, this.options).map(function (res) { return res.json(); });
    };
    OdontogramService.prototype.newOdontogram = function (odontogram) {
        this.createAuthenticationHeaders(); // Create headers
        console.log(odontogram);
        return this.http.post(this.domain + 'odontograms/newOdontogram/', odontogram, this.options).map(function (res) { return res.json(); });
    };
    OdontogramService.prototype.editOdontogram = function (cedula) {
        this.createAuthenticationHeaders(); // Create headers
        return this.http.put(this.domain + 'odontograms/updateOdontogram/', cedula, this.options).map(function (res) { return res.json(); });
    };
    OdontogramService.prototype.getOdontogram = function (cedula) {
        this.createAuthenticationHeaders(); // Create headers
        return this.http.get(this.domain + 'odontograms/odontogram/' + cedula, this.options).map(function (res) { return res.json(); });
    };
    OdontogramService.prototype.getAllOdontogram = function (cedula) {
        this.createAuthenticationHeaders(); // Create headers
        return this.http.get(this.domain + 'odontograms/allOdontogram/' + cedula, this.options).map(function (res) { return res.json(); });
    };
    // method for creating a odontogram which takes
    // an optional size parameter that defaults to 5
    OdontogramService.prototype.createOdontogram = function (size, size2) {
        if (size === void 0) { size = 19; }
        if (size2 === void 0) { size2 = 19; }
        this.clickable = [["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0"],
            ["0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0"],
            ["0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0"],
            ["0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0", "x", "x", "x", "0"],
            ["0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0", "0", "x", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]];
        this.pieces = [["000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000"],
            ["000", "000", "011", "000", "000", "000", "021", "000", "000", "000", "031", "000", "000", "000", "041", "000", "000", "000", "051", "000", "000", "000", "061", "000", "000", "000", "071", "000", "000", "000", "081", "000", "000", "000", "091", "000", "000", "000", "101", "000", "000", "000", "111", "000", "000", "000", "121", "000", "000", "000", "131", "000", "000", "000", "141", "000", "000", "000", "151", "000", "000", "000", "161", "000", "000", "000"],
            ["000", "014", "015", "012", "000", "024", "025", "022", "000", "034", "035", "032", "000", "044", "045", "042", "000", "054", "055", "052", "000", "064", "065", "062", "000", "074", "075", "072", "000", "084", "085", "082", "000", "094", "095", "092", "000", "104", "105", "102", "000", "114", "115", "112", "000", "124", "125", "122", "000", "134", "135", "132", "000", "144", "145", "142", "000", "154", "155", "152", "000", "164", "165", "162", "000", "000"],
            ["000", "000", "013", "000", "000", "000", "023", "000", "000", "000", "033", "000", "000", "000", "043", "000", "000", "000", "053", "000", "000", "000", "063", "000", "000", "000", "073", "000", "000", "000", "083", "000", "000", "000", "093", "000", "000", "000", "103", "000", "000", "000", "113", "000", "000", "000", "123", "000", "000", "000", "133", "000", "000", "000", "143", "000", "000", "000", "153", "000", "000", "000", "163", "000", "000", "000"],
            ["000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000"],
            ["000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000"],
            ["000", "000", "171", "000", "000", "000", "181", "000", "000", "000", "191", "000", "000", "000", "201", "000", "000", "000", "211", "000", "000", "000", "221", "000", "000", "000", "231", "000", "000", "000", "241", "000", "000", "000", "251", "000", "000", "000", "261", "000", "000", "000", "271", "000", "000", "000", "281", "000", "000", "000", "291", "000", "000", "000", "301", "000", "000", "000", "311", "000", "000", "000", "321", "000", "000", "000"],
            ["000", "174", "175", "172", "000", "184", "185", "182", "000", "194", "195", "192", "000", "204", "205", "202", "000", "214", "215", "212", "000", "224", "225", "222", "000", "234", "235", "232", "000", "244", "245", "242", "000", "254", "255", "252", "000", "264", "265", "262", "000", "274", "275", "272", "000", "284", "285", "282", "000", "294", "295", "292", "000", "304", "305", "302", "000", "314", "315", "312", "000", "324", "325", "322", "000", "000"],
            ["000", "000", "173", "000", "000", "000", "183", "000", "000", "000", "193", "000", "000", "000", "203", "000", "000", "000", "213", "000", "000", "000", "223", "000", "000", "000", "233", "000", "000", "000", "243", "000", "000", "000", "253", "000", "000", "000", "263", "000", "000", "000", "273", "000", "000", "000", "283", "000", "000", "000", "293", "000", "000", "000", "303", "000", "000", "000", "313", "000", "000", "000", "323", "000", "000", "000"],
            ["000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000"]];
        var tiles = [];
        for (var i = 0; i < size; i++) {
            tiles[i] = [];
            for (var j = 0; j < size2; j++) {
                if (this.clickable[i][j] == "0") {
                    tiles[i][j] = { used: false, value: 0, status: '' };
                }
                else {
                    tiles[i][j] = { used: true, value: 0, status: '' };
                }
            }
            //tiles[0][3].status="calza";
        }
        var odontogram = new odontogram_1.Odontogram({
            tiles: tiles
        });
        this.odontograms.push(odontogram);
        return this;
    };
    // returns all created odontograms
    OdontogramService.prototype.getOdontograms = function () {
        return this.odontograms;
    };
    OdontogramService = __decorate([
        core_1.Injectable()
    ], OdontogramService);
    return OdontogramService;
}());
exports.OdontogramService = OdontogramService;