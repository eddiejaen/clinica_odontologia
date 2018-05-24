import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarModule } from 'angular-calendar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { PatientService } from './services/patient.service';
import { CalendarService } from './services/calendar.service';
import { CalendarComponent } from './components/calendar/calendar.component';
import { OdontogramComponent } from './components/odontogram/odontogram.component';
import { BoardComponent } from './components/board/board.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { PatientComponent } from './components/patient/patient.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {DemoUtilsModule} from './demo-utils/module'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    BoardComponent,
    PatientComponent,
    CalendarComponent,
    OdontogramComponent,
    PublicProfileComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    FlashMessagesModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    NgbModalModule.forRoot(),
    DemoUtilsModule
  ],
  providers: [AuthService, AuthGuard, NotAuthGuard, PatientService, CalendarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
