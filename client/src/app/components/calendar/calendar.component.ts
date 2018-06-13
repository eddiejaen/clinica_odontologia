
import { Component,ChangeDetectionStrategy,ViewChild,TemplateRef, OnInit} from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addMinutes} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent} from 'angular-calendar';
import { CalendarService } from '../../services/calendar.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
    styleUrls: ['./calendar.component.css'],
    selector: 'calendars',
    templateUrl: './calendar.component.html'
})
export class CalendarComponent {@ViewChild('modalContent') modalContent: TemplateRef<any>;

      newEvent=
        {
          start: subDays(startOfDay(new Date()), 1),
          end: subDays(startOfDay(new Date()), 1),
          title: ''
        }
      ;
      view: string = 'month';
      viewDate: Date = new Date();
      modalData: {
        action: string;
        event: CalendarEvent;
      };

      actions: CalendarEventAction[] = [
        {
          label: '<i class="fa fa-fw fa-pencil"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.handleEvent('Edited', event);
          }
        },
        {
          label: '<i class="fa fa-fw fa-times"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter(iEvent => iEvent !== event);
            this.handleEvent('Deleted', event);
          }
        }
      ];

      refresh: Subject<any> = new Subject();
      // events: CalendarEvent[] = [];
      events: CalendarEvent[] = [];

      activeDayIsOpen: boolean = true;

      constructor(private modal: NgbModal,
          private calendarService: CalendarService) {
                  this.getAllCalendar();

          }
          ngOnInit(): void {
                    this.getAllCalendar();
          }

      dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
          if (
            (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
            events.length === 0
          ) {
            this.activeDayIsOpen = false;
          } else {
            this.activeDayIsOpen = true;
            this.viewDate = date;
          }
        }
      }

      eventTimesChanged({
        event,
        newStart,
        newEnd
      }: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        this.handleEvent('Dropped or resized', event);
        this.refresh.next();
      }

      handleEvent(action: string, event: CalendarEvent): void {
        this.modalData = { event, action };
        this.modal.open(this.modalContent, { size: 'lg' });
      }



      addEvent(): void {
        // console.log(this.events);
        this.events.push({
          title: 'New event',
          start: startOfDay(new Date()),
          end: endOfDay(new Date()),
          color: colors.red,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true
          }
        });
        console.log(this.events);
        this.refresh.next();
      }


      messageClass;
      message;
      processing = false;


      onCalendarSubmit(){
        this.processing = true;
        let result = addMinutes(this.newEvent.start, 30)
        this.newEvent.end = result;
        this.calendarService.newCalendar(this.newEvent).subscribe(data => {
          // Check if history was saved to database or not
          if (!data.success) {
            this.messageClass = 'alert alert-danger'; // Return error class
            this.message = data.message; // Return error message
            this.processing = false; // Enable submit button
          } else {
            this.messageClass = 'alert alert-success'; // Return success class
            this.message = data.message;
            this.getAllCalendar();
            // Return success message
            // Clear form data after two seconds
            setTimeout(() => {
            this.processing = false; // Enable submit button
              //window.location.reload();
            }, 1000);
          }
        });
      }

      getAllCalendar() {

          this.calendarService.getAllCalendar().subscribe(data => {
            console.log(data);
            for (let calendar of data.calendars) {
            let event = {
              id : calendar._id,
              title: calendar.title,
              start: new Date(calendar.start),
              end: new Date(calendar.end),
              color: colors.red,
              draggable: true,
              resizable: {
                beforeStart: true,
                afterEnd: true
              }
            };
            this.events.push(event);
            this.refresh.next();
          };
          console.log(this.events);
        });
      }

      deleteCalendar(id) {

          this.calendarService.deleteCalendar(id).subscribe(data => {
            console.log(data);
            for (let calendar of data.calendars) {
            let event = {
              id : calendar._id,
              title: calendar.title,
              start: new Date(calendar.start),
              end: new Date(calendar.end),
              color: colors.red,
              draggable: true,
              resizable: {
                beforeStart: true,
                afterEnd: true
              }
            };
          //  this.events.push(event);
            this.refresh.next();
          };
          console.log(this.events);
        });
      }
}
