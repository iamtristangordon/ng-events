import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { config } from "../data/config";

@Injectable()

export class EventsService {
    constructor(private http: HttpClient) { }

    public getEvents(): Observable<any> {
        return this.http.get(config.apiRoot, { headers: { 'Authorization': 'Basic ' + btoa(`${config.username}:${config.password}`) } });
    }
}
