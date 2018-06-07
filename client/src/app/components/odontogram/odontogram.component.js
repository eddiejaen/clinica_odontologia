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
var odontogram_service_1 = require("../../services/odontogram.service");
// import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
// set game constants
var BOARD_SIZE = 10;
var BOARD_SIZE2 = 65;
var OdontogramComponent = /** @class */ (function () {
    function OdontogramComponent(_vcr, odontogramService) {
        this._vcr = _vcr;
        this.odontogramService = odontogramService;
        this.processing = false;
        this.newOdontogram = false;
        this.editOdontogram = false;
        this.selected_row = 0;
        this.selected_col = 0;
        this.pieza = "";
        this.odontogramBlanco = {
            cedula: "110990099",
            caries: false,
            mal_estado: false,
            buen_estado: false,
            diente: " "
        };
        console.log("Inicia");
        //this.createNewOdontogramForm();
        console.log("Finaliza");
        this.createOdontograms();
    }
    OdontogramComponent.prototype.alphaNumericValidation = function (controls) {
        var regExp = new RegExp(/^[a-zA-Z0-9 ]+$/); // Regular expression to perform test
        // Check if test returns false or true
        if (regExp.test(controls.value)) {
            return null; // Return valid
        }
        else {
            return { 'alphaNumericValidation': true }; // Return error in validation
        }
    };
    OdontogramComponent.prototype.verOdontogram = function (odontogram) {
        this.odontogramSelect = odontogram;
        this.getAllOdontogram();
    };
    OdontogramComponent.prototype.createNewOdontogramForm = function () {
        // this.form = this.formBuilder.group({
        //
        //   caries: ['', Validators.compose([
        //     Validators.required,
        //     Validators.minLength(3),
        //     Validators.maxLength(50),
        //     this.alphaNumericValidation
        //   ])],
        //   mal_estado: ['', Validators.compose([
        //     Validators.required,
        //     Validators.minLength(4),
        //     Validators.maxLength(50),
        //     this.alphaNumericValidation
        //   ])],
        //   buen_estado: ['', Validators.compose([
        //     Validators.required,
        //     Validators.minLength(3),
        //     Validators.maxLength(50),
        //     this.alphaNumericValidation
        //   ])],
        //   pieza: ['', Validators.compose([
        //     Validators.required,
        //     Validators.minLength(3),
        //     Validators.maxLength(50),
        //     this.alphaNumericValidation
        //   ])],
        // })
    };
    // newOdontogramForm() {
    //     this.newOdontogram= true; // Show new treatment form2
    //   }
    //
    // editOdontogramForm() {
    //   this.editOdontogram = true; // Show new patient form
    // }
    OdontogramComponent.prototype.onOdontogramSubmit = function (a, b, c, d) {
        var _this = this;
        this.processing = true; // Disable submit button
        // Create history object from form fields
        var odontogram = {
            //cedula: this.patientSelect.cedula,
            caries: a.checked,
            mal_estado: b.checked,
            buen_estado: c.checked,
            diente: d.value,
        };
        // Function to save history into database
        this.odontogramService.newOdontogram(this.odontogramBlanco).subscribe(function (data) {
            // Check if history was saved to database or not
            if (!data.success) {
                _this.messageClass = 'alert alert-danger'; // Return error class
                _this.message = data.message; // Return error message
                _this.processing = false; // Enable submit button
            }
            else {
                _this.messageClass = 'alert alert-success'; // Return success class
                _this.message = data.message; // Return success message
                // Clear form data after two seconds
                _this.processing = false; // Enable submit button
                setTimeout(function () {
                    //window.location.reload();
                }, 1000);
            }
        });
    };
    OdontogramComponent.prototype.updateOdontogram = function (a, b, c, d) {
        var _this = this;
        this.processing = true;
        var odontogram = {
            cedula: this.patientSelect.cedula,
            caries: a.checked,
            mal_estado: b.checked,
            buen_estado: c.checked,
            diente: d.value,
        };
        // Function to save history into database
        this.odontogramService.editOdontogram(this.odontogramSelect).subscribe(function (data) {
            // Check if history was saved to database or not
            if (!data.success) {
                _this.messageClass = 'alert alert-danger'; // Return error class
                _this.message = data.message; // Return error message
                _this.processing = false; // Enable submit button
            }
            else {
                _this.messageClass = 'alert alert-success'; // Return success class
                _this.message = data.message; // Return success message
                // Clear form data after two seconds
                setTimeout(function () {
                    _this.processing = false; // Enable submit button
                    //window.location.reload();
                }, 1000);
            }
        });
    };
    OdontogramComponent.prototype.getOdontogram = function () {
        var _this = this;
        // Function to GET all patients from database
        console.log(this.patientSelect.cedula);
        this.odontogramService.getOdontogram(this.patientSelect.cedula).subscribe(function (data) {
            _this.odontogramX = data.odontogram; // Assign array to use in HTML
            console.log(_this.odontogramX);
            if (!_this.odontogramX) {
                _this.odontogramX = _this.odontogramBlanco;
                _this.odontogramSelect = _this.odontogramBlanco;
            }
        });
    };
    // Function to get all treatment
    OdontogramComponent.prototype.getAllOdontogram = function () {
        var _this = this;
        // Function to GET all patients from database
        console.log(this.patientSelect.cedula);
        this.odontogramService.getAllOdontogram(this.patientSelect.cedula).subscribe(function (data) {
            _this.odontogramX = data.odontogram; // Assign array to use in HTML
            console.log(_this.odontogramX);
            _this.odontogramSelect = _this.odontogramBlanco;
            if (!_this.odontogramX) {
                _this.odontogramX = _this.odontogramBlanco;
            }
        });
    };
    OdontogramComponent.prototype.clickTile = function (e) {
        console.log(e.target);
        var id = e.target.id, odontogramId = id.substring(1, 2), row = parseInt(id.substring(2, 4)), col = parseInt(id.substring(4, 6)), tile = this.odontograms[odontogramId].tiles[row][col];
        this.selected_row = row;
        this.selected_col = col;
        this.pieza = this.odontogramService.pieces[row][col];
        return;
        // this.odontograms[odontogramId].tiles[row][col].used = true;
        // this.odontograms[odontogramId].tiles[row][col].value = "X";
        // return this;
    };
    OdontogramComponent.prototype.createOdontograms = function () {
        this.odontogramService.createOdontogram(BOARD_SIZE, BOARD_SIZE2);
        return this;
    };
    Object.defineProperty(OdontogramComponent.prototype, "odontograms", {
        // get all odontograms and assign to odontograms property
        get: function () {
            return this.odontogramService.getOdontograms();
        },
        enumerable: true,
        configurable: true
    });
    OdontogramComponent.prototype.transformNumber = function (numero) {
        var texto = '';
        if (numero.toString().length == 1) {
            texto = '0' + numero.toString();
        }
        else {
            texto = numero.toString();
        }
        return texto;
    };
    OdontogramComponent.prototype.imprimeValor = function (i, j) {
        var valor = this.odontogramService.pieces[i][j];
        if (valor !== "000") {
            return valor;
        }
        else {
            return "";
        }
    };
    OdontogramComponent = __decorate([
        core_1.Component({
            selector: 'app-odontogram',
            templateUrl: './odontogram.component.html',
            styleUrls: ['./odontogram.component.css'],
            providers: [odontogram_service_1.OdontogramService]
        })
    ], OdontogramComponent);
    return OdontogramComponent;
}());
exports.OdontogramComponent = OdontogramComponent;
