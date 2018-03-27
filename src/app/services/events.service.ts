import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Response } from "@angular/http";

import { Observable } from "rxjs";

import { Status } from '../models/status.model';
import { EventsRequestResult } from '../models/events-request-result.model';
import { Event } from '../models/event.model';

@Injectable()

export class EventsService {
    private url: string = "http://localhost:4000/api";
    
    constructor(private http: HttpClient) { }

    public getEvents(): Observable<EventsRequestResult> {
        return this.http.get<EventsRequestResult>(`${this.url}/events/`);
    }

    public getEventById(eventId: string): Observable<Event> {
        return this.http.get<Event>(`${this.url}/event/${eventId}`);
    }

    public getStatusById(eventId): Observable<Status> {
        return this.http.get<Status>(`${this.url}/status/${eventId}`);
    }

    setStatusById(eventId: string, statusModel) {
        return this.http.put(`${this.url}/status/${eventId}`, statusModel);
    }
}
