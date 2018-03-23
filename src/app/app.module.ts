import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule, MatCardModule, MatProgressSpinnerModule, MatCheckboxModule, MatButtonModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgEventsRoutingModule } from "./ng-events-routing.module";
import { TruncateTextPipe } from "./pipes/truncate-text.pipe";
import { AppComponent } from "./app.component";
import { NgEventsComponent } from "./ng-events/ng-events.component";
import { NgEventDetailsComponent } from './ng-event-details/ng-event-details.component';
import { NgAlertComponent } from "./ng-alert/ng-alert.component";
import { EventsService } from "./services/events.service";
import { CommonService } from "./services/common.service";
import { AlertService } from "./services/alert.service";


@NgModule({
    declarations: [
        AppComponent,
        NgEventsComponent,
        TruncateTextPipe,
        NgEventDetailsComponent,
        NgAlertComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        NgEventsRoutingModule,
        MatCardModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatButtonModule
    ],
    providers: [
        EventsService,
        CommonService,
        AlertService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
