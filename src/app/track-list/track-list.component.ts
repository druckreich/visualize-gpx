import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Select} from "@ngxs/store";
import {MainState} from "../state/main.state";
import {Observable} from "rxjs";
import {GPXService} from "../state/gpx.service";

@Component({
    selector: 'app-track-list',
    templateUrl: './track-list.component.html',
    styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit {

    @Select(MainState.tracks)
    tracks$: Observable<any[]>;

    @Output()
    trackSelected: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit(): void {
    }

    onTrackSelected(track: any) {
        GPXService.trackByName(track.path);
    }

}
