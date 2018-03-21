import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule, MatIconModule, MatButtonModule, MatCardModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { NgEventsComponent } from "./ng-events/ng-events.component";
import { EventsService } from "./services/events.service";
import { NgEventsRoutingModule } from "./ng-events-routing.module";


@NgModule({
    declarations: [
        AppComponent,
        NgEventsComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        NgEventsRoutingModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        FormsModule
    ],
    providers: [
        EventsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
