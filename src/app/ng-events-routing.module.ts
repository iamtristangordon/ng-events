import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { NgEventsComponent } from "./ng-events/ng-events.component";

export const routes: Routes = [
    { path: "", component: NgEventsComponent }
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
