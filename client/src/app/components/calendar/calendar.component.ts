
import { NgModule, Component, enableProdMode } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {Appointment, CalendarService} from '../../services/calendar.service';
import {DxSchedulerModule} from 'devextreme-angular';

@Component({
    styleUrls: ['./calendar.component.css'],
    selector: 'calendars',
    templateUrl: './calendar.component.html',
    providers: [CalendarService]
})
export class CalendarComponent {
    appointmentsData: Appointment[];
    currentDate: Date = new Date(2017, 4, 25);

    constructor(service: CalendarService) {
        this.appointmentsData = service.getAppointments();
    }
}
