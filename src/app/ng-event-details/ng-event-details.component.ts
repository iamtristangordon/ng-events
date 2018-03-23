import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { EventsService } from '../services/events.service';
import { CommonService } from '../services/common.service';

import { Subject } from "rxjs";
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
import { AlertService } from '../services/alert.service';

@Component({
    selector: 'app-ng-event-details',
    templateUrl: './ng-event-details.component.html',
    styleUrls: ['./ng-event-details.component.scss']
})
export class NgEventDetailsComponent implements OnInit {
    private eventId: string;
    private subscription: any;
    public showEvent: boolean = false;
    showAttendingSpinner: boolean = false;
    public selectedEvent;
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    private statusModel = {
        coming: false
    };

    constructor(
        private eventsService: EventsService,
        private route: ActivatedRoute,
        private common: CommonService,
        private changeDetectorRef: ChangeDetectorRef,
        private alert: AlertService) { }

    ngOnInit() {
        this.subscription = this.route.paramMap
            .subscribe(params => {
                if (params.get('eventId')) {
                    this.eventId = params.get('eventId');
                    this.getEventById();
                }
            });
    }

    getEventById() {
        this.eventsService.getEventById(this.eventId).takeUntil(this.ngUnsubscribe).subscribe((res) => {
            console.log(res);
            this.selectedEvent = res;

            this.showEvent = true;
            this.getStatusById();
        }, error => {
            console.log(error);
            this.showEvent = true;

            this.alert.error("The event could not be retrieved at this time.");
        });
    }

    getStatusById() {
        this.eventsService.getStatusById(this.eventId)
            .retryWhen(error => error.delay(1000))
            .subscribe((res) => {
                if (typeof (res.coming) === "boolean") {
                    this.statusModel.coming = res.coming;
                } else {
                    this.alert.error("Your attendance status could not be retrieved at this time.");
                }

                console.log(res);
                if (this.showAttendingSpinner) this.showAttendingSpinner = false;
            }, error => {
                console.log(error);
                if (this.showAttendingSpinner) this.showAttendingSpinner = false;
            });
    }

    setStatusById() {
        this.showAttendingSpinner = true;
        /*will recieve expression change error for checkbox disabled attribute 
        without manually triggering detection*/
        this.changeDetectorRef.detectChanges();

        this.eventsService.setStatusById(this.eventId, this.statusModel)
            .retryWhen(error => error.delay(1000))
            .subscribe((res) => {
                console.log(res);
                this.alert.success("Your attendance status has been updated.");
                this.showAttendingSpinner = false;
            }, error => {
                console.log(error);
                this.alert.error("Your attendance status could not be updated at this time.");
                this.showAttendingSpinner = false;
            });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.unsubscribe();
    }

    getUrl(eventId: string, mediaId: string): string {
        return this.common.getUrl(eventId, mediaId);
    }

    updateUrl($event) {
        this.common.updateUrl($event);
    }
}
