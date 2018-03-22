import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { EventsService } from '../services/events.service';
import { CommonService } from '../services/common.service';

import { Subject } from "rxjs";
import 'rxjs/add/operator/takeUntil';

@Component({
    selector: 'app-ng-event-details',
    templateUrl: './ng-event-details.component.html',
    styleUrls: ['./ng-event-details.component.scss']
})
export class NgEventDetailsComponent implements OnInit {
    private eventId: string;
    private subscription: any;
    public showEvent: boolean = false;
    public selectedEvent;
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    private statusModel = {
        coming: true
    };

    constructor(
        private eventsService: EventsService,
        private route: ActivatedRoute,
        private common: CommonService) { }

    ngOnInit() {
        this.subscription = this.route.paramMap
        .subscribe(params => {
            if(params.get('eventId')) {
                this.eventId = params.get('eventId');
                this.getEventById();
            }
        });
    }

    getEventById() {
        this.eventsService.getEventById(this.eventId).takeUntil(this.ngUnsubscribe).subscribe((res) => {
            console.log(res);
            this.selectedEvent = res;
            
            this.getStatusById();
        }, error => {
            console.log(error);
            this.showEvent = true;
        });
    }

    getStatusById() {
        this.eventsService.getStatusById(this.eventId).subscribe((res) => {
            if(typeof(res.coming) === "boolean") {
                this.statusModel.coming = res.coming;
            }

            console.log(res);
            this.showEvent = true;
        }, error => {
            console.log(error);
            this.showEvent = true;
        });
    }

    setStatusById() {
        this.eventsService.setStatusById(this.eventId, this.statusModel).subscribe((res) => {
            console.log(res);
        }, error => {
            console.log(error);
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
