import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';
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

    gpx: L.GPX;

    data: any;


    baseLayers = {
        'Open Street Map': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18})
    };

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(public actions$: Actions, public ct: ChangeDetectorRef) {
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

    showTrack(map: L.Map, gpxString: string) {
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

        this.gpx = <L.GPX>new L.GPX(gpxString, gpxOptions).addEventListener('loaded', (e) => {
            this.setData(e.target);
            this.map.fitBounds(e.target.getBounds());
        });
        this.gpx.addTo(map);

    }

    setData(gpx: L.GPX) {
        this.data = {
            distance: gpx.get_distance(),
            start_time: gpx.get_start_time(),
            end_time: gpx.get_end_time(),
            moving_time: gpx.get_moving_time(),
            total_time: this.convertMiliseconds(gpx.get_total_time()),
            moving_speed: gpx.get_moving_speed(),
            moving_pace: gpx.get_moving_pace(),
            total_speed: gpx.get_total_speed(),
            elevation_gain: gpx.get_elevation_gain(),
            elevation_min: gpx.get_elevation_min(),
            elevation_max: gpx.get_elevation_max()
        };
        console.table(this.data);
        this.ct.markForCheck();
    }

    convertMiliseconds(miliseconds) {
        var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

        total_seconds = Math.floor(miliseconds / 1000);
        total_minutes = Math.floor(total_seconds / 60);
        total_hours = Math.floor(total_minutes / 60);
        days = Math.floor(total_hours / 24);

        seconds = total_seconds % 60;
        minutes = total_minutes % 60;
        hours = total_hours % 24;

        return {d: days, h: hours, m: minutes, s: seconds};
    };

}
