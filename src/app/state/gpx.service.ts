import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {AllTracks, TrackByName} from "./main.actions";

@Injectable({
    providedIn: "root"
})
export class GPXService {

    // Link to our api, pointing to localhost
    API = 'http://localhost:3000';

    @Dispatch()
    public static allTracks() {
        return new AllTracks();
    }

    @Dispatch()
    public static trackByName(name: string) {
        return new TrackByName(name);
    }

    constructor(public http: HttpClient) {
    }

    allTracks() {
        return this.http.get(`${this.API}/tracks`);
    }

    trackByName(name: string) {
        return this.http.get(`${this.API}/tracks/` + name);
    }
}
