import { Component, OnInit, Input } from "@angular/core";
import { trigger, style, animate, transition } from "@angular/animations";
import { Comment } from "../models/comment.model";
import { EventsService } from "../services/events.service";

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

    constructor(private events: EventsService) { }

    ngOnInit() {
        this.events.getEvents().subscribe((res) => {
            console.log(res);
        });
    }

}
