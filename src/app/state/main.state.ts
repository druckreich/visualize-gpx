import {Action, State, StateContext} from '@ngxs/store';
import {AllTracks} from './main.actions';
import {GPXService} from "./gpx.service";
import {tap} from "rxjs/operators";

export class MainStateModel {
    public tracks: string[];
}

@State<MainStateModel>({
    name: 'main',
    defaults: {
        tracks: []
    }
})
export class MainState {

    constructor(public gpxService: GPXService) {
    }

    @Action(AllTracks)
    allTracks(ctx: StateContext<MainStateModel>, action: AllTracks) {
        return this.gpxService.allTracks().pipe(
            tap((tracks: string[]) => {
                ctx.setState({
                    tracks: tracks
                })
            })
        )
    }
}
