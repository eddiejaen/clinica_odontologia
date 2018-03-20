import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PatientService } from '../../services/patient.service';
import { history, treatment } from "../../interfaces/patient.interface";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  messageClass;
  message;
  cedulaValid;
  newPatient = false;
  editPatient = false;
  editTreatment = false;
  profilePatient = false;
  loadingPatients = false;
  form;
  form2;
  processing = false;
  username;
  patientPosts;
  historyPosts:history;
  patientSelect;
  treatmentX:treatment;

  historyBlanco: history = {
      cedula: "",
      tratamiento: false,
      medicamento: false,
      diabetes: false,
      artritis: false,
      cardiacas: false,
      fiebre: false,
      hepatitis: false,
      ulceras: false,
      trastornos: false,
      nerviosas: false,
      otras_enfermedades: "",
      internado: false,
      alteraciones: false,
      padecimiento: false,
      aspirina: false,
      penicilina: false,
      sulfas: false,
      otros_medicamentos: "",
      anestesia: false,
      sangrado: false,
      desmayos: false,
      embarazada: false,
      lactancia: false,
      transtornos: false,
      observaciones: ""
    };

treatmentBlanco: treatment = {
  cedula: "",
  fecha:null,
  pieza: "",
  descripcion: "",
  debe: "",
  abono: "",
  saldo: ""
};

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private patientService: PatientService
  ) {
    this.createNewPatientForm(); // Create new patient form on start up
    this.createNewTreatmentForm(); // Revisa ésta línea
  }

  // Function to create new patient form
  createNewPatientForm() {
    this.form = this.formBuilder.group({

      inputNombre: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        this.alphaNumericValidation
      ])],
      inputApellido: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        this.alphaNumericValidation
      ])],
      inputRecomendado: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        this.alphaNumericValidation
      ])],
      inputDireccion: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        this.alphaNumericValidation
      ])],
      inputCanton: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        this.alphaNumericValidation
      ])],
      inputProvincia: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        this.alphaNumericValidation
      ])],
      inputCedula: ['', Validators.compose([
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(15),
        this.alphaNumericValidation
      ])],
      inputOcupacion: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        this.alphaNumericValidation
      ])],
      inputCelular: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        this.alphaNumericValidation
      ])],
      inputOficina: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        this.alphaNumericValidation
      ])],
      inputExt: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
        this.alphaNumericValidation
      ])],
      inputHabitacion: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
        this.alphaNumericValidation
      ])],
      inputApdo: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        this.alphaNumericValidation
      ])],
      inputMedico: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        this.alphaNumericValidation
      ])],
      inputAvisar: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        this.alphaNumericValidation
      ])],
      inputParentesco: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        this.alphaNumericValidation
      ])],
      inputTelParentesco: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        this.alphaNumericValidation
      ])],
    })
  }

  // Function to create new treatment form
  createNewTreatmentForm() {
    this.form2 = this.formBuilder.group({

      inputFecha: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        this.alphaNumericValidation
      ])],
      inputPieza: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        this.alphaNumericValidation
      ])],
      descripcion: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        this.alphaNumericValidation
      ])],
      inputDebe: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        this.alphaNumericValidation
      ])],
      inputAbono: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        this.alphaNumericValidation
      ])],
      inputSaldo: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        this.alphaNumericValidation
      ])],
    })
  }

  // Enable new patient form
  enableFormNewPatientForm() {
    this.form.controls['inputNombre'].enable();
    this.form.controls['inputApellido'].enable();
    this.form.controls['inputRecomendado'].enable();
    this.form.controls['inputDireccion'].enable();
    this.form.controls['inputCanton'].enable();
    this.form.controls['inputProvincia'].enable();
    this.form.controls['inputCedula'].enable();
    this.form.controls['inputOcupacion'].enable();
    this.form.controls['inputCelular'].enable();
    this.form.controls['inputOficina'].enable();
    this.form.controls['inputExt'].enable();
    this.form.controls['inputHabitacion'].enable();
    this.form.controls['inputApdo'].enable();
    this.form.controls['inputMedico'].enable();
    this.form.controls['inputAvisar'].enable();
    this.form.controls['inputParentesco'].enable();
    this.form.controls['inputTelParentesco'].enable();
  }

  // Disable new patient form
  disableFormNewPatientForm() {
    this.form.controls['inputNombre'].disable();
    this.form.controls['inputApellido'].disable();
    this.form.controls['inputRecomendado'].disable();
    this.form.controls['inputDireccion'].disable();
    this.form.controls['inputCanton'].disable();
    this.form.controls['inputProvincia'].disable();
    this.form.controls['inputCedula'].disable();
    this.form.controls['inputOcupacion'].disable();
    this.form.controls['inputCelular'].disable();
    this.form.controls['inputOficina'].disable();
    this.form.controls['inputExt'].disable();
    this.form.controls['inputHabitacion'].disable();
    this.form.controls['inputApdo'].disable();
    this.form.controls['inputMedico'].disable();
    this.form.controls['inputAvisar'].disable();
    this.form.controls['inputParentesco'].disable();
    this.form.controls['inputTelParentesco'].disable();
  }

  // Validation for title
  alphaNumericValidation(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/); // Regular expression to perform test
    // Check if test returns false or true
    if (regExp.test(controls.value)) {
      return null; // Return valid
    } else {
      return { 'alphaNumericValidation': true } // Return error in validation
    }
  }

  // Function to display new patient form
  newPatientForm() {
    this.newPatient = true; // Show new patient form
  }

  // Function to display new patient form
  editPatientForm() {
    this.editPatient = true; // Show new patient form
  }

  editTreatmentForm2() {
    this.editTreatment = true; // Show new patient form
  }

  // Reload patients on current page
  reloadPatients() {
    this.loadingPatients = true; // Used to lock button
  //  this.getAllPatients(); // Add any new patients to the page
    setTimeout(() => {
      this.loadingPatients = false; // Release button lock after four seconds
    }, 4000);
  }

  // Function to submit a new patient post
  onPatientSubmit() {
    this.processing = true; // Disable submit button
    this.disableFormNewPatientForm(); // Lock form

    // Create patient object from form fields
    const patient = {
      inputNombre: this.form.get('inputNombre').value,
      inputApellido: this.form.get('inputApellido').value,
      inputRecomendado: this.form.get('inputRecomendado').value,
      inputDireccion: this.form.get('inputDireccion').value,
      inputCanton: this.form.get('inputCanton').value,
      inputProvincia: this.form.get('inputProvincia').value,
      inputCedula: this.form.get('inputCedula').value,
      inputOcupacion: this.form.get('inputOcupacion').value,
      inputCelular: this.form.get('inputCelular').value,
      inputOficina: this.form.get('inputOficina').value,
      inputExt: this.form.get('inputExt').value,
      inputHabitacion: this.form.get('inputHabitacion').value,
      inputApdo: this.form.get('inputApdo').value,
      inputMedico: this.form.get('inputMedico').value,
      inputAvisar: this.form.get('inputAvisar').value,
      inputParentesco: this.form.get('inputParentesco').value,
      inputTelParentesco: this.form.get('inputTelParentesco').value
    }

    // Function to save patient into database
    this.patientService.newPatient(patient).subscribe(data => {
      // Check if patient was saved to database or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error class
        this.message = data.message; // Return error message
        this.processing = false; // Enable submit button
        this.enableFormNewPatientForm(); // Enable form
      } else {
        this.messageClass = 'alert alert-success'; // Return success class
        this.message = data.message; // Return success message
        // Clear form data after two seconds
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });
  }

  // Function to submit a new history post
  onHistorialSubmit(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y) {
    this.processing = true; // Disable submit button

    // Create history object from form fields
    const history = {
      cedula: this.patientSelect.cedula,
      tratamiento: a.checked,
      medicamento: b.checked,
      diabetes: c.checked,
      artritis: d.checked,
      cardiacas: e.checked,
      fiebre: f.checked,
      hepatitis: g.checked,
      ulceras: h.checked,
      trastornos: i.checked,
      nerviosas: j.checked,
      otras_enfermedades: w.value,
      internado: k.checked,
      alteraciones: l.checked,
      padecimiento: m.checked,
      aspirina: n.checked,
      penicilina: o.checked,
      sulfas: p.checked,
      otros_medicamentos: x.value,
      anestesia: q.checked,
      sangrado: r.checked,
      desmayos: s.checked,
      embarazada: t.checked,
      lactancia: u.checked,
      transtornos: v.checked,
      observaciones: y.value
    //  inputFecha: this.form.get('inputFecha').value
    }

    // Function to save history into database
    this.patientService.newHistory(history).subscribe(data => {
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
          //window.location.reload();
        }, 1000);
      }
    });
  }

  onTreatmentSubmit(a,b,c,d,e,f){
    this.processing = true;

    const treatment = {
      cedula: this.patientSelect.cedula,
      fecha: a.value,
      pieza: b.value,
      descripcion: c.value,
      debe: d.value,
      abono: e.value,
      saldo: f.value,
    }

    // Function to save history into database
    this.patientService.newTreatment(treatment).subscribe(data => {
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
          //window.location.reload();
        }, 1000);
      }
    });
  }

  onPatientUpdateSubmit() {
    this.processing = true; // Disable submit button
    this.disableFormNewPatientForm(); // Lock form

    // Create patient object from form fields
    const patient = {
      _id: this.patientSelect._id,
      nombre: this.form.get('inputNombre').value,
      apellido: this.form.get('inputApellido').value,
      recomendado: this.form.get('inputRecomendado').value,
      direccion: this.form.get('inputDireccion').value,
      canton: this.form.get('inputCanton').value,
      provincia: this.form.get('inputProvincia').value,
      cedula: this.form.get('inputCedula').value,
      ocupacion: this.form.get('inputOcupacion').value,
      telefono_celular: this.form.get('inputCelular').value,
      telefono_oficina: this.form.get('inputOficina').value,
      ext_oficina: this.form.get('inputExt').value,
      telefono_habitacion: this.form.get('inputHabitacion').value,
      apdo_habitacion: this.form.get('inputApdo').value,
      medico: this.form.get('inputMedico').value,
      emergencia: this.form.get('inputAvisar').value,
      parentesco: this.form.get('inputParentesco').value,
      telefono_parentesco: this.form.get('inputTelParentesco').value
    }

    // Function to save patient into database
    this.patientService.editPatient(patient).subscribe(data => {
      // Check if patient was saved to database or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error class
        this.message = data.message; // Return error message
        this.processing = false; // Enable submit button
        this.enableFormNewPatientForm(); // Enable form
      } else {
        this.messageClass = 'alert alert-success'; // Return success class
        this.message = data.message; // Return success message
        // Clear form data after two seconds
        setTimeout(() => {
          this.messageClass = ""; // Return success class
          this.message = ""; // Return success message
          this.processing = false;
          this.enableFormNewPatientForm();
        }, 2000);
      }
    });
  }

  // Function to go back to previous page
  goBack() {
    window.location.reload(); // Clear all variable states
  }

  // // Function to get all patients from the database
  getAllPatients() {
    // Function to GET all patients from database
    this.patientService.getAllPatients().subscribe(data => {
      this.patientPosts = data.patients; // Assign array to use in HTML
    });
  }
  getHistory() {
    // Function to GET all patients from database
    this.patientService.getHistory(this.patientSelect.cedula).subscribe(data => {
    this.historyPosts = data.history; // Assign array to use in HTML
    if (!this.historyPosts)
   {
     this.historyPosts = this.historyBlanco;
   }
    });
  }

  getTreatment() {
    // Function to GET all patients from database
    this.patientService.getTreatment(this.patientSelect.cedula).subscribe(data => {
    this.treatmentX = data.treatment; // Assign array to use in HTML
    if (!this.treatmentX)
   {
     this.treatmentX = this.treatmentBlanco;
   }
    });
  }

  // Function to check if username is available
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

  verPaciente(patient : any){
    this.profilePatient = true;
    this.patientSelect = patient;
    this.getHistory();
    this.getTreatment();
  }

  ngOnInit() {
    // // Get profile username on page load
    // this.authService.getProfile().subscribe(profile => {
    //   this.username = profile.user.username; // Used when creating new patient posts and comments
    // });

    this.getAllPatients(); // Get all patients on component load
  }
}
