
import { NgModule, Component, enableProdMode } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {Appointment, CalendarService} from '../../services/calendar.service';
import {DxSchedulerModule} from 'devextreme-angular';

if(!/localhost/.test(document.location.host)) {
    enableProdMode();
}

@Component({
    styleUrls: ['./calendar.component.css'],
    selector: 'calendar',
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

@NgModule({
    imports: [
        BrowserModule,
        DxSchedulerModule
    ],
    declarations: [CalendarComponent],
    bootstrap: [CalendarComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
