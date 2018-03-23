import { Component, OnInit } from "@angular/core";
import { trigger, style, transition, animate } from "@angular/animations";

import { AlertService } from "../services/alert.service";

@Component({
    selector: "app-ng-alert",
    templateUrl: './ng-alert.component.html',
    styleUrls: [
        './ng-alert.component.scss'
    ],
    animations: [
        trigger(
            "enterAnimation", [
                transition(":enter", [
                    style({ "max-height": 0 }),
                    animate("800ms", style({ "max-height": "300px" }))
                ]),
                transition(":leave", [
                    style({ "max-height": "300px" }),
                    animate("300ms", style({ "max-height": 0 }))
                ])
            ]
        )
    ]
})
export class NgAlertComponent implements OnInit {
    public message: any;
    public show: boolean;

    constructor(private alertService: AlertService) {
        this.show = false;
    }

    private showAlert() {
        this.show = true;
    }

    private hideAlert () {
        this.show = false;
    }

    ngOnInit() {
        this.alertService.getMessage().subscribe((data) => {
            this.message = data;
            this.showAlert();

            setTimeout(() => { this.hideAlert() }, 4000);
        });
    }
}
