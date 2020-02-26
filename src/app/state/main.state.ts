import {Action, Select, Selector, State, StateContext} from '@ngxs/store';
import {AllTracks, TrackByName} from './main.actions';
import {GPXService} from "./gpx.service";
import {tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {patch, updateItem} from "@ngxs/store/operators";

export class MainStateModel {
    public tracks: any[];
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

    @Action(AllTracks)
    trackByName(ctx: StateContext<MainStateModel>, action: TrackByName) {
        return this.gpxService.trackByName(action.name).pipe(
            tap((gpx: string) => {
                console.log(gpx);
            })
        )
    }
}
