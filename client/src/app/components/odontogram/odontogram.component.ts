import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import './js/jquery-1.7.1.min.js';
import './js/plugins.js';
import './js/knockout-2.0.0.js';
import './js/jquery.svg.min.js';
import './js/jquery.svggraph.min.js';
import './js/odontograma.js';


@Component({
  selector: 'app-odontogram',
  templateUrl: './odontogram.component.html',
  styleUrls: ['./odontogram.component.css']

})
export class OdontogramComponent implements AfterViewInit {
  // tratamientoSeleccionado : Array={};


  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  // Function to logout user
  onLogoutClick() {
  }

  ngAfterViewInit() {

  }

  alertTratamiento(): void {
  // console.log(this.tratamientoSeleccionado);
  //this.curUser = user;
  }

}
