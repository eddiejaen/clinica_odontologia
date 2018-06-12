import { Injectable } from "@angular/core";
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

export class Appointment {
    text: string;
    startDate: Date;
    endDate: Date;
    allDay?: boolean;
}

let appointments: Appointment[] = [
    {
        text: "Website Re-Design Plan",
        startDate: new Date(2017, 4, 22, 9, 30),
        endDate: new Date(2017, 4, 22, 11, 30)
    }, {
        text: "Book Flights to San Fran for Sales Trip",
        startDate: new Date(2017, 4, 22, 12, 0),
        endDate: new Date(2017, 4, 22, 13, 0),
        allDay: true
    }, {
        text: "Install New Router in Dev Room",
        startDate: new Date(2017, 4, 22, 14, 30),
        endDate: new Date(2017, 4, 22, 15, 30)
    }, {
        text: "Approve Personal Computer Upgrade Plan",
        startDate: new Date(2017, 4, 23, 10, 0),
        endDate: new Date(2017, 4, 23, 11, 0)
    }, {
        text: "Final Budget Review",
        startDate: new Date(2017, 4, 23, 12, 0),
        endDate: new Date(2017, 4, 23, 13, 35)
    }, {
        text: "New Brochures",
        startDate: new Date(2017, 4, 23, 14, 30),
        endDate: new Date(2017, 4, 23, 15, 45)
    }, {
        text: "Install New Database",
        startDate: new Date(2017, 4, 24, 9, 45),
        endDate: new Date(2017, 4, 24, 11, 15)
    }, {
        text: "Approve New Online Marketing Strategy",
        startDate: new Date(2017, 4, 24, 12, 0),
        endDate: new Date(2017, 4, 24, 14, 0)
    }, {
        text: "Upgrade Personal Computers",
        startDate: new Date(2017, 4, 24, 15, 15),
        endDate: new Date(2017, 4, 24, 16, 30)
    }, {
        text: "Customer Workshop",
        startDate: new Date(2017, 4, 25, 11, 0),
        endDate: new Date(2017, 4, 25, 12, 0),
        allDay: true
    }, {
        text: "Prepare 2015 Marketing Plan",
        startDate: new Date(2017, 4, 25, 11, 0),
        endDate: new Date(2017, 4, 25, 13, 30)
    }, {
        text: "Brochure Design Review",
        startDate: new Date(2017, 4, 25, 14, 0),
        endDate: new Date(2017, 4, 25, 15, 30)
    }, {
        text: "Create Icons for Website",
        startDate: new Date(2017, 4, 26, 10, 0),
        endDate: new Date(2017, 4, 26, 11, 30)
    }, {
        text: "Upgrade Server Hardware",
        startDate: new Date(2017, 4, 26, 14, 30),
        endDate: new Date(2017, 4, 26, 16, 0)
    }, {
        text: "Submit New Website Design",
        startDate: new Date(2017, 4, 26, 16, 30),
        endDate: new Date(2017, 4, 26, 18, 0)
    }, {
        text: "Launch New Website",
        startDate: new Date(2017, 4, 26, 12, 20),
        endDate: new Date(2017, 4, 26, 14, 0)
    }
];

@Injectable()
export class CalendarService {
    getAppointments(): Appointment[] {
        return appointments;
    }

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

    //  PATIENT
    newCalendar(calendar) {
      this.createAuthenticationHeaders(); // Create headers
      return this.http.post(this.domain + 'calendars/newCalendar', calendar, this.options).map(res => res.json());
    }
    getAllCalendar() {
      this.createAuthenticationHeaders(); // Create headers
      return this.http.post(this.domain + 'calendars/allCalendar', this.options).map(res => res.json());
    }
}
