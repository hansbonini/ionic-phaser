import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'

import { AppComponent } from './app.component'

import { NgxElectronModule } from 'ngx-electron'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), NgxElectronModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
