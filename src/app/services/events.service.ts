import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

@Injectable()

export class EventsService {
    private url: string = "http://localhost:4000/api";
    constructor(private http: HttpClient) { }

    public getEvents(): Observable<any> {
        return this.http.get(`${this.url}/events/`);
    }

    public getEventById(eventId: string) {
        return this.http.get(`${this.url}/event/${eventId}`);
    }

    public getStatusById(eventId): Observable<any> {
        return this.http.get(`${this.url}/status/${eventId}`);
    }

    setStatusById(eventId, statusModel) {
        return this.http.put(`${this.url}/status/${eventId}`, statusModel);
    }
}
