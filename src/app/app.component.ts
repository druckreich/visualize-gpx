import {Component} from '@angular/core';
// Import Leaflet into L
import * as L from 'leaflet';
import {GPXService} from "./state/gpx.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'visualize-gpx';

    selectedTrack: any = null;

    constructor() {
        GPXService.allTracks();
    }


    onTrackSelected(track: any) {
        this.selectedTrack = track;
    }
}
