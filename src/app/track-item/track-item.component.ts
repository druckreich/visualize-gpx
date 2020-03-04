import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as L from "leaflet";
import {Track} from "../state/main.state";
import {GPXService} from "../state/gpx.service";
import {Actions, ofActionDispatched} from "@ngxs/store";
import {GPXByTracknameSuccess} from "../state/main.actions";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
    selector: 'app-track-item',
    templateUrl: './track-item.component.html',
    styleUrls: ['./track-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackItemComponent implements OnInit, OnChanges {

    @Input()
    track: Track;

    map: L.Map;
    center: L.LatLng = L.latLng([46.879966, -121.726909]);
    fitBounds: L.LatLngBounds = L.latLngBounds([[40.712, -74.227], [40.774, -74.125]]);

    baseLayers = {
        'Open Street Map': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18})
    };

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(public actions$: Actions) {
        this.actions$
            .pipe(
                takeUntil(this.destroy$),
                ofActionDispatched(GPXByTracknameSuccess)
            )
            .subscribe(({gpx}) => {
                this.showTrack(this.map, gpx)
            })
    }

    ngOnInit(): void {
        GPXService.gpxByTrackname(this.track.name);
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }

    ngOnChanges(changes: SimpleChanges) {
    }

    onMapReady(map: L.Map) {
        this.map = map;
    }

    showTrack(map: L.Map, gpx: string) {
        const gpxOptions: L.GPXOptions = {
            async: true,
            marker_options: {
                markerIcon: L.icon({
                    iconSize: [25, 41],
                    iconAnchor: [13, 41],
                    iconUrl: 'assets/images/pin-icon-start.png',
                    shadowUrl: 'assets/images/pin-shadow.png'
                }),
                startIcon: L.icon({
                    iconSize: [25, 41],
                    iconAnchor: [13, 41],
                    iconUrl: 'assets/images/pin-icon-start.png',
                    shadowUrl: 'assets/images/pin-shadow.png'
                }),
                endIcon: L.icon({
                    iconSize: [25, 41],
                    iconAnchor: [13, 41],
                    iconUrl: 'assets/images/pin-icon-end.png',
                    shadowUrl: 'assets/images/pin-shadow.png'
                }),
                wptIcons: {
                    '': L.icon({
                        iconSize: [25, 41],
                        iconAnchor: [13, 41],
                        iconUrl: 'assets/images/pin-icon-wpt.png',
                        shadowUrl: 'assets/images/pin-shadow.png'
                    })
                }
            }
        };
        new L.GPX(gpx, gpxOptions).addTo(map);
    }

}
