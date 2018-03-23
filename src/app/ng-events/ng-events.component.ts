import { Component, OnInit, Input } from "@angular/core";
import { trigger, style, animate, transition } from "@angular/animations";
import { Router } from '@angular/router';

import { Subject } from "rxjs";
import 'rxjs/add/operator/takeUntil';

import { CommonService } from "../services/common.service";
import { AlertService } from "../services/alert.service";
import { EventsService } from "../services/events.service";
import { EventsRequestResult } from '../models/events-request-result.model';

@Component({
    selector: "app-ng-events",
    templateUrl: "./ng-events.component.html",
    styleUrls: ["./ng-events.component.scss"],
    animations: [
        trigger("animateEvents", [
            transition(":enter", [
                style({ transform: "scale(0.001)", opacity: 0 }),
                animate("300ms", style({ transform: "translateX(0)", opacity: 1 }))
            ]),
            transition(":leave", [
                style({ transform: "translateX(0)", opacity: 1 }),
                animate("300ms", style({ transform: "scale(0.001)", opacity: 0 }))
            ])
        ])
    ]
})
export class NgEventsComponent implements OnInit {
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    public events: any;
    public eventsLastRetrieved: string;
    public showEvents: boolean = false;

    constructor(
        private eventsService: EventsService,
        private router: Router,
        private common: CommonService,
        private alert: AlertService) { }

    ngOnInit() {
        this.getEvents();
    }

    getEvents() {
        this.eventsService.getEvents().takeUntil(this.ngUnsubscribe).subscribe((res: EventsRequestResult) => {
            this.eventsLastRetrieved = new Date(res.timeStamp).toUTCString();
            this.events = res.events;
            
            this.showEvents = true;
        }, error => {
            this.alert.error("The events could not be retrieved at this time.");
            this.showEvents = true;
        });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.unsubscribe();
    }

    getUrl(eventId: string, mediaId: string): string {
        return this.common.getUrl(eventId, mediaId);
    }

    viewEventDetails(eventId) {
        this.router.navigateByUrl(`event-details/${eventId}`);
    }

    updateUrl($event) {
        this.common.updateUrl($event);
    }
}
