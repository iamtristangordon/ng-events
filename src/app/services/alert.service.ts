import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

@Injectable()
export class AlertService {
    private subject = new Subject<any>();

    constructor() {}

    public success(message: string) {
        this.subject.next({ type: "success", text: message });
    }

    public error(message: string) {
        this.subject.next({ type: "error", text: message });
    }

    public close() {
        this.subject.next();
    }

    public getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
