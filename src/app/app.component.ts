import {Component} from '@angular/core';
// Import Leaflet into L
import * as L from 'leaflet';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'visualize-gpx';

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

    onMapReady(map: L.Map) {
        const gpx: string = "../assets/island.gpx";
        const gpxOptions: L.GPXOptions = {
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
