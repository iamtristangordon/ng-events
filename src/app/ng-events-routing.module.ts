import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { NgEventsComponent } from "./ng-events/ng-events.component";
import { NgEventDetailsComponent } from "./ng-event-details/ng-event-details.component";

export const routes: Routes = [
    { path: "", component: NgEventsComponent },
    { path: "event-details/:eventId", component: NgEventDetailsComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class NgEventsRoutingModule { }
