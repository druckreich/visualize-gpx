import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {HttpClientModule} from "@angular/common/http";
import {NgxsModule} from "@ngxs/store";
import {NgxsDispatchPluginModule} from '@ngxs-labs/dispatch-decorator';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {MainState} from "./state/main.state";
import {TrackListComponent} from './track-list/track-list.component';
import {TrackItemComponent} from './track-item/track-item.component';
import {MatCardModule} from "@angular/material/card";
import {RouterModule, Routes} from "@angular/router";
import {MatGridListModule} from "@angular/material/grid-list";

import 'leaflet-gpx';

const ROUTES: Routes = [
    {path: "", component: TrackListComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        TrackListComponent,
        TrackItemComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(ROUTES),

        NgxsModule.forRoot([MainState]),
        NgxsLoggerPluginModule.forRoot({disabled: true}),
        NgxsDispatchPluginModule.forRoot(),

        LeafletModule.forRoot(),

        MatGridListModule,
        MatCardModule
    ],
    providers: [],
    bootstrap: [AppComponent]

})
export class AppModule {
}
