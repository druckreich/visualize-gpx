import {Component, OnInit} from '@angular/core';
import {Select} from "@ngxs/store";
import {MainState, Track} from "../state/main.state";
import {Observable} from "rxjs";

@Component({
    selector: 'app-track-list',
    templateUrl: './track-list.component.html',
    styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit {

    @Select(MainState.tracks)
    tracks$: Observable<Track[]>;

    constructor() {

    }

    ngOnInit(): void {
    }

    onResize(event): void {
    }
}
