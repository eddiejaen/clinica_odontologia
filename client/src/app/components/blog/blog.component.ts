import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  messageClass;
  message;
  cedulaValid;
  newPost = false;
  loadingBlogs = false;
  form;
  commentForm;
  processing = false;
  username;
  blogPosts;
  newComment = [];
  enabledComments = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private blogService: BlogService
  ) {
    this.createNewBlogForm(); // Create new blog form on start up
  }

  // Function to create new blog form
  createNewBlogForm() {
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

  // Enable new blog form
  enableFormNewBlogForm() {
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

  // Disable new blog form
  disableFormNewBlogForm() {
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

  // Function to display new blog form
  newBlogForm() {
    this.newPost = true; // Show new blog form
  }

  // Reload blogs on current page
  reloadBlogs() {
    this.loadingBlogs = true; // Used to lock button
  //  this.getAllBlogs(); // Add any new blogs to the page
    setTimeout(() => {
      this.loadingBlogs = false; // Release button lock after four seconds
    }, 4000);
  }

  // Function to submit a new blog post
  onBlogSubmit() {
    this.processing = true; // Disable submit button
    this.disableFormNewBlogForm(); // Lock form

    // Create blog object from form fields
    const blog = {
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

    // Function to save blog into database
    this.blogService.newBlog(blog).subscribe(data => {
      // Check if blog was saved to database or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error class
        this.message = data.message; // Return error message
        this.processing = false; // Enable submit button
        this.enableFormNewBlogForm(); // Enable form
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

  // Function to go back to previous page
  goBack() {
    window.location.reload(); // Clear all variable states
  }

  // // Function to get all blogs from the database
  getAllBlogs() {
    // Function to GET all blogs from database
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogPosts = data.blogs; // Assign array to use in HTML
    });
  }

  // Collapse the list of comments
  collapse(id) {
    const index = this.enabledComments.indexOf(id); // Get position of id in array
    this.enabledComments.splice(index, 1); // Remove id from array
  }

  // Function to check if username is available
  checkCedula() {
    // Function from authentication file to check if username is taken
    this.blogService.checkCedula(this.form.get('inputCedula').value).subscribe(data => {
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

  ngOnInit() {
    // Get profile username on page load
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Used when creating new blog posts and comments
    });
    this.getAllBlogs(); // Get all blogs on component load
  }
}
