import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AllTracks, GPXByTrackname, GPXByTracknameSuccess} from './main.actions';
import {GPXService} from "./gpx.service";
import {tap} from "rxjs/operators";
import {Injectable} from "@angular/core";

export class Track {
    name: string;
    path: string;
    gpx: string;
    pending: boolean;
}

export class MainStateModel {
    public tracks: Track[];
}

@State<MainStateModel>({
    name: 'main',
    defaults: {
        tracks: []
    }
})
@Injectable()
export class MainState {

    @Selector()
    public static tracks(state: MainStateModel) {
        return state.tracks;
    }

    constructor(public gpxService: GPXService) {
    }

    @Action(AllTracks)
    allTracks(ctx: StateContext<MainStateModel>, action: AllTracks) {
        return this.gpxService.allTracks().pipe(
            tap((tracks: any[]) => {
                ctx.setState({
                    tracks: tracks
                })
            })
        )
    }

    @Action(GPXByTrackname)
    trackByName(ctx: StateContext<MainStateModel>, action: GPXByTrackname) {
        return this.gpxService.trackByName(action.name).pipe(
            tap((gpx: string) => ctx.dispatch(new GPXByTracknameSuccess(gpx)))
        )
    }
}
