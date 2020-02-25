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
        var markerIcon = L.icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'pin-icon-start.png',
            shadowUrl: 'pin-icon-end.png'
        });
        L.marker([51.5, -0.09], {icon: markerIcon}).addTo(map);


        const gpx: string = "../assets/island.gpx";

        const gpxOptions: L.GPXOptions = {
            marker_options: {
                startIconUrl: 'assets/images/pin-icon-start.png',
                endIconUrl: 'assets/images/pin-icon-end.png',
                shadowUrl: 'assets/images/pin-shadow.png'
            }
        };
        new L.GPX(gpx, gpxOptions).addTo(map);
    }
}
