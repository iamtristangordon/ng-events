import { Component, OnInit, Input } from "@angular/core";
import { trigger, style, animate, transition } from "@angular/animations";

import { Comment } from "../models/comment.model";
import { EventsService } from "../services/events.service";

import { Subject } from "rxjs";

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
    private colors:string[] = ["e0435e", "ece1ee", "9f80a7", "43061e","0c0000"];

    constructor(private eventsService: EventsService) { }

    ngOnInit() {
        this.getEvents();
    }

    getEvents() {
        this.eventsService.getEvents().subscribe((res) => {
            this.eventsLastRetrieved = new Date(res.timeStamp).toUTCString();
            this.events = res.events;
            console.log(this.events);
            this.showEvents = true;
        }, error => {
            this.showEvents = true;
            console.log(error);
        });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.unsubscribe();
    }

    getUrl(eventId, mediaId) {
        if(mediaId.includes('/')) {
            mediaId = encodeURIComponent(mediaId);
        }
        let url = `http://localhost:4000/api/media/${eventId}/${mediaId}`;

        return url;
    }

    updateUrl($event) {
        $event.target.src = this.randomizeColor("http://via.placeholder.com/350x200");
    }

    randomizeColor(url: string) {
        let num = Math.floor(Math.random() * ((5-1)+1) + 1) - 1;

        let color = this.colors[num];
        
        return url + "/" + color + "?text=+";

    }
}
