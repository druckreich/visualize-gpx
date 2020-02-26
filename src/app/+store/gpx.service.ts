import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class GPXService {

    // Link to our api, pointing to localhost
    API = 'http://localhost:3000';

    constructor(public http: HttpClient) {
    }

    loadTracks() {
        this.http.get(`${this.API}/tracks`)
            .subscribe((tracks: any) => {
                console.log(tracks);
            })
    }
}
