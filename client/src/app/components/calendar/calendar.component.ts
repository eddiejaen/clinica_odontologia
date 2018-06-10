
import { Component,ChangeDetectionStrategy,ViewChild,TemplateRef} from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours} from 'date-fns';
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
      events: CalendarEvent[] = [
        {
          start: subDays(startOfDay(new Date()), 1),
          end: addDays(new Date(), 1),
          title: 'Un evento de 3 días',
          color: colors.red,
          actions: this.actions
        },
        {
          start: startOfDay(new Date()),
          title: 'Un evento sin fecha de fin',
          color: colors.yellow,
          actions: this.actions
        },
        {
          start: subDays(endOfMonth(new Date()), 3),
          end: addDays(endOfMonth(new Date()), 3),
          title: 'Un evento que se extiende 2 meses',
          color: colors.blue
        },
        {
          start: addHours(startOfDay(new Date()), 2),
          end: new Date(),
          title: 'Un evento que se puede arrastrar y ampliar',
          color: colors.yellow,
          actions: this.actions,
          resizable: {
            beforeStart: true,
            afterEnd: true
          },
          draggable: true
        }
      ];

      activeDayIsOpen: boolean = true;

      constructor(private modal: NgbModal,
          private calendarService: CalendarService) {}

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
        console.log(this.events);
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
        this.refresh.next();
      }


      messageClass;
      message;
      processing = false;

      calendarBlanco = {
        paciente: " ",
        color: " ",
        color1: " ",
        inicia: " ",
        final: " ",
        };
      onCalendarSubmit(a,b,c,d,e){
        this.processing = true;

        const calendar = {
          paciente: a.value,
          color: b.value,
          color1: c.value,
          inicia: d.value,
          final: e.value,
        }

        // Function to save history into database
        this.calendarService.newCalendar(calendar).subscribe(data => {
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
            this.processing = false; // Enable submit button
              //window.location.reload();
            }, 1000);
          }
        });
      }
}
