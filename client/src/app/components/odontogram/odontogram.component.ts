import { Component, ViewContainerRef } from '@angular/core';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { OdontogramService } from '../../services/odontogram.service'
import { PatientService } from '../../services/patient.service'
import { Odontogram } from '../../class/odontogram'
import { odontogram } from "../../interfaces/patient.interface";
// import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
// set game constants
const BOARD_SIZE: number = 10;
const BOARD_SIZE2: number = 65;



@Component({
  selector: 'app-odontogram',
  templateUrl: './odontogram.component.html',
  styleUrls: ['./odontogram.component.css'],
  providers: [OdontogramService]
})

export class OdontogramComponent {
  messageClass;
  message;
  cedulaValid;
  form;
  processing = false;
  patientSelect;
  newOdontogram = false;
  editOdontogram = false;
  odontogramSelect;
  selected_row: number = 0;
  selected_col: number = 0;

    odontogramBlanco = {
        cedula: '',
        caries: false,
        mal_estado: false,
        buen_estado: false,
        diente: " "
      };

  constructor(

    private _vcr: ViewContainerRef,
    private odontogramService: OdontogramService,
    private patientService: PatientService
  ) {
    this.odontogramBlanco.cedula = this.patientService.cedula;
    console.log("cedula "+ this.odontogramBlanco.cedula);
    this.createOdontograms();

  }

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
    this.getOdontogram();
    //this.getAllOdontogram();
  }

    onOdontogramSubmit(a,b,c,d) {
        this.processing = true; // Disable submit button

        // Create history object from form fields
        const odontogram = {
          //cedula: this.patientSelect.cedula,
          caries: a.checked,
          mal_estado: b.checked,
          buen_estado: c.checked,
          diente: d.value,
        }

        // Function to save history into database
        this.odontogramService.newOdontogram(this.odontogramBlanco).subscribe(data => {
          // Check if history was saved to database or not
          if (!data.success) {
            this.messageClass = 'alert alert-danger'; // Return error class
            this.message = data.message; // Return error message
            this.processing = false; // Enable submit button
          } else {
            this.messageClass = 'alert alert-success'; // Return success class
            this.message = data.message; // Return success message
            // Clear form data after two seconds
            this.processing = false; // Enable submit button
            setTimeout(() => {
              //window.location.reload();
            }, 1000);
          }
        });
      }

      getOdontogram() {
  
        console.log (this.patientService.cedula);
        this.odontogramService.getOdontogram(this.patientService.cedula).subscribe(data => {
        this.odontogramSelect = this.odontogramBlanco;

        });
      }
    // Function to get all treatment
      // getAllOdontogram() {
      //     // Function to GET all patients from database
      //
      //     console.log (this.patientService.cedula);
      //     this.odontogramService.getAllOdontogram(this.patientService.cedula).subscribe(data => {
      //     this.odontogramSelect = this.odontogramBlanco;
      //     });
      //   }

  clickTile(e:any) : OdontogramComponent {
  console.log(e.target);
    let id = e.target.id,
      odontogramId = id.substring(1,2),
      row = parseInt(id.substring(2,4)), col = parseInt(id.substring(4,6)),
      tile = this.odontograms[odontogramId].tiles[row][col];
      this.selected_row = row;
      this.selected_col = col;
      this.odontogramBlanco.diente = this.odontogramService.pieces[row][col];
      return;
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
