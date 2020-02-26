import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {AllTracks} from "./main.actions";

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

    constructor(public http: HttpClient) {
    }

    allTracks() {
        return this.http.get(`${this.API}/tracks`);
    }
}
