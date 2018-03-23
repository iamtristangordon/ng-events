import { Injectable } from "@angular/core";

@Injectable()

export class CommonService {
    private colors:string[] = ["e0435e", "ece1ee", "9f80a7", "43061e","0c0000"];
    
    constructor() { }

    updateUrl($event) {
        $event.target.src = this.randomizeColor("http://via.placeholder.com/350x200");
    }

    randomizeColor(url: string): string {
        let num = Math.floor(Math.random() * ((5-1)+1) + 1) - 1;

        let color = this.colors[num];
        
        return url + "/" + color + "?text=+";

    }

    getUrl(eventId: string, mediaId: string): string {
        if(mediaId.includes('/')) {
            mediaId = encodeURIComponent(mediaId);
        }
        let url = `http://localhost:4000/api/media/${eventId}/${mediaId}`;

        return url;
    }
}
