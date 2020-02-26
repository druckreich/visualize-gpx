import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {HttpClientModule} from "@angular/common/http";
import 'leaflet-gpx';
import {NgxsModule} from "@ngxs/store";
import {NgxsDispatchPluginModule} from '@ngxs-labs/dispatch-decorator';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {MainState} from "./state/main.state";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgxsModule.forRoot([MainState]),
        NgxsLoggerPluginModule.forRoot(),
        NgxsDispatchPluginModule.forRoot(),
        LeafletModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]

})
export class AppModule {
}
