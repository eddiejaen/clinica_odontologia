import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class PatientService {

  options;
  domain = this.authService.domain;

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }

  // Function to create headers, add token, to be used in HTTP requests
createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authService.authToken // Attach token
      })
    });
  }


  checkCedula(cedula) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'patients/checkCedula/' + cedula, this.options).map(res => res.json());
  }

  //  PATIENT
  newPatient(patient) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'patients/newPatient', patient, this.options).map(res => res.json());
  }
  getAllPatients() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'patients/allPatients', this.options).map(res => res.json());
  }
    // Function to get the patient using the id
  getSinglePatient(id) {
      this.createAuthenticationHeaders(); // Create headers
      return this.http.get(this.domain + 'patients/singlePatient/' + id, this.options).map(res => res.json());
  }
  editPatient(patient) {
      this.createAuthenticationHeaders(); // Create headers
      return this.http.put(this.domain + 'patients/updatePatient/', patient, this.options).map(res => res.json());
  }

  /// HISTORY
  newHistory(history) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'patients/newHistory', history, this.options).map(res => res.json());
  }
  getHistory(cedula) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'patients/history/' + cedula, this.options).map(res => res.json());
  }
  editHistory(cedula) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + 'patients/updateHistory/', cedula, this.options).map(res => res.json());
  }


  ///TREATMENT
  newTreatment(treatment) {
    this.createAuthenticationHeaders(); // Create headers
    console.log (treatment);
    return this.http.post(this.domain + 'patients/newTreatment', treatment, this.options).map(res => res.json());
  }
  editTreatment(cedula) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + 'patients/updateTreatment/', cedula, this.options).map(res => res.json());
  }
  getTreatment(cedula) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'patients/treatment/' + cedula, this.options).map(res => res.json());
  }
  getAllTreatments(cedula) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'patients/allTreatments/' + cedula, this.options).map(res => res.json());
  }

  // Function to delete a patient
  // deletePatient(id) {
  //   this.createAuthenticationHeaders(); // Create headers
  //   return this.http.delete(this.domain + 'patients/deletePatient/' + id, this.options).map(res => res.json());
  // }
  //
  // // Function to like a patient post
  // likePatient(id) {
  //   const patientData = { id: id };
  //   return this.http.put(this.domain + 'patients/likePatient/', patientData, this.options).map(res => res.json());
  // }
  //
  // // Function to dislike a patient post
  // dislikePatient(id) {
  //   const patientData = { id: id };
  //   return this.http.put(this.domain + 'patients/dislikePatient/', patientData, this.options).map(res => res.json());
  // }
  //
  // // Function to post a comment on a patient post
  // postComment(id, comment) {
  //   this.createAuthenticationHeaders(); // Create headers
  //   // Create patientData to pass to backend
  //   const patientData = {
  //     id: id,
  //     comment: comment
  //   }
  //   return this.http.post(this.domain + 'patients/comment', patientData, this.options).map(res => res.json());
  //
  // }

}
