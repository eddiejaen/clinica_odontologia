import { Component, ViewContainerRef } from '@angular/core';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { odontogram } from "../../interfaces/patient.interface";
import { OdontogramService } from '../../services/odontogram.service';
import { Odontogram } from '../../class/odontogram';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { AuthService } from '../../services/auth.service';
// set game constants
const BOARD_SIZE: number = 10;
const BOARD_SIZE2: number = 61;



@Component({
  selector: 'app-odontogram',
  templateUrl: './odontogram.component.html',
  styleUrls: ['./odontogram.component.css'],
  providers: [OdontogramService]
})

export class OdontogramComponent{
  messageClass;
  message;
  cedulaValid;
  processing = false;
  form;
   selected_row: number = 0;
   selected_col: number = 0;
   pieza:string = "";
   newOdontogram = false;
   editOdontogram = false;
   odontogramSelect;
   odontogramX:odontogram;
  patientSelect;

   alphaNumericValidation(controls) {
     const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/); // Regular expression to perform test
     // Check if test returns false or true
     if (regExp.test(controls.value)) {
       return null; // Return valid
     } else {
       return { 'alphaNumericValidation': true } // Return error in validation
     }
   }

   verOdontogram(odontogram : any){
     this.odontogramSelect = odontogram;
   }

   checkCedula() {
       // Function from authentication file to check if username is taken
       this.patientService.checkCedula(this.form.get('inputCedula').value).subscribe(data => {
         // Check if success true or success false was returned from API
         if (!data.success) {
           this.cedulaValid = false; // Return username as invalid
           this.messageClass = 'alert alert-danger'; // Return error class
           this.message = data.message; // Return error message
         } else {
           this.cedulaValid = true; // Return username as valid
           this.messageClass = 'alert alert-success'; // Return success class
           this.message = data.message;
         }
       });
     }

  constructor(
    private _vcr: ViewContainerRef,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private patientService: PatientService,
    private odontogramService: OdontogramService
  ) {
    this.createOdontograms();
  }

  odontogramBlanco: odontogram = {
    cedula: " ",
    calza:false,
    extraccion: false,
    pieza: " ",
  };

  newOdontogramForm() {
      this.newOdontogram= true; // Show new treatment form2
    }
  // Function to edit treatment
  editOdontogramForm() {
      this.editOdontogram = true; // Show new treatment form2
    }

    onOdontogramSubmit(a,b,c) {
        this.processing = true;

        const odontogram = {
          cedula: this.patientSelect.cedula,
          calza: a.checked,
          extraccion: b.checked,
          pieza: c.value,
        //  inputFecha: this.form.get('inputFecha').value
        }

        // Function to save history into database
        this.OdontogramService.newOdontogram(odontogram).subscribe(data => {
          // Check if history was saved to database or not
          if (!data.success) {
            this.messageClass = 'alert alert-danger'; // Return error class
            this.message = data.message; // Return error message
            this.processing = false; // Enable submit button
          } else {
            this.messageClass = 'alert alert-success'; // Return success class
            this.message = data.message;
            this.processing = false; // Enable submit button
            setTimeout(() => {
              //window.location.reload();
            }, 1000);
          }
        });
      }
    // Function to update history
    updateOdontogram(a,b,c){
        this.processing = true;

        const odontogram = {
          cedula: this.patientSelect.cedula,
          calza: a.checked,
          extraccion: b.checked,
          pieza: c.value,
        }

        // Function to save history into database
        this.OdontogramService.editOdontogram(this.odontogramSelect).subscribe(data => {
          // Check if history was saved to database or not
          if (!data.success) {
            this.messageClass = 'alert alert-danger'; // Return error class
            this.message = data.message; // Return error message
            this.processing = false; // Enable submit button
          } else {
            this.messageClass = 'alert alert-success'; // Return success class
            this.message = data.message; // Return success message

            // Clear form data after two seconds
            setTimeout(() => {
            this.processing = false; // Enable submit button
              //window.location.reload();
            }, 1000);
          }
        });
      }

      getOdontogram() {
          // Function to GET all patients from database
          console.log (this.patientSelect.cedula);
          this.odontogramService.getOdontogram(this.patientSelect.cedula).subscribe(data => {
          this.odontogramX = data.odontogram; // Assign array to use in HTML
          console.log (this.odontogramX);
          if (!this.odontogramX)
         {
           this.odontogramX = this.odontogramBlanco;
           this.odontogramSelect = this.odontogramBlanco;
         }
          });
        }
    // Function to get all treatment
      getAllOdontogram() {
          // Function to GET all patients from database
          console.log (this.patientSelect.cedula);
          this.odontogramService.getAllOdontogram(this.patientSelect.cedula).subscribe(data => {
          this.odontogramX = data.odontogram; // Assign array to use in HTML
          console.log (this.odontogramX);
          this.odontogramSelect = this.odontogramBlanco;
          if (!this.odontogramX)
         {
           this.odontogramX = this.odontogramBlanco;
         }
          });
        }


  clickTile(e:any) : OdontogramComponent {
  console.log(e.target);
    let id = e.target.id,
      odontogramId = id.substring(1,2),
      row = parseInt(id.substring(2,4)), col = parseInt(id.substring(4,6)),
      tile = this.odontograms[odontogramId].tiles[row][col];
      this.selected_row = row;
      this.selected_col = col;
      this.pieza = this.odontogramService.pieces[row][col];
      return;

    // this.odontograms[odontogramId].tiles[row][col].used = true;
    // this.odontograms[odontogramId].tiles[row][col].value = "X";
    // return this;
  }

  createOdontograms() : OdontogramComponent {
      this.odontogramService.createOdontogram(BOARD_SIZE, BOARD_SIZE2);
    return this;
  }

  // get all odontograms and assign to odontograms property
  get odontograms () : Odontogram[] {
    return this.odontogramService.getOdontograms()
  }

  transformNumber(numero:number) : string {
    let texto = '';
    if (numero.toString().length == 1){
      texto = '0' + numero.toString()
    }else{
      texto = numero.toString()
    }

    return texto;
  }
  imprimeValor(i, j){
    let valor = this.odontogramService.pieces[i][j];
    if (valor !== "000"){
      return valor;
    }else{
      return "";
    }
  }
}
