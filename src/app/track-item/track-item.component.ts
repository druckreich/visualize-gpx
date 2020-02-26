import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as L from "leaflet";

@Component({
    selector: 'app-track-item',
    templateUrl: './track-item.component.html',
    styleUrls: ['./track-item.component.scss']
})
export class TrackItemComponent implements OnInit, OnChanges {

    @Input()
    track: string;

    map: L.Map;

    options = {
        layers: [
            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'}),
        ],
        zoom: 5,
        center: L.latLng(46.95, -122)
    };

    layers = [];

    layersControl = {
        baseLayers: {
            'Open Street Map': L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '...'
            })
        }
    };


    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
        if (changes['track'].currentValue) {
            this.showTrack(this.track);
        }
    }


    onMapReady(map: L.Map) {
        this.map = map;
    }

    showTrack(track: string) {
        const gpx: string = "localhost:3000/" + track;
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
        new L.GPX(gpx, gpxOptions)
            .on('loaded', function (e) {
              console.log(e);
                this.map.fitBounds(e.target.getBounds());
            }).addTo(this.map);
    }

}
