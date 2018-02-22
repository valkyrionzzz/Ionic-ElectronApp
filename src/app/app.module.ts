import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthenticationPage } from '../pages/authentication/authentication';
import { TcmodalPage } from '../pages/tcmodal/tcmodal';
import { LogoutPage } from '../pages/logout/logout';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HttpClientModule } from '@angular/common/http';



import { Configuration } from '../configuration/configuration';
import { AuthenticationserviceProvider } from '../providers/authenticationservice/authenticationservice';
import { DataserviceProvider } from '../providers/dataservice/dataservice';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LogoutPage,
    AuthenticationPage,
    TcmodalPage,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    // AngularFireDatabaseModule,
    // AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AuthenticationPage,
    LogoutPage,
    TcmodalPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticationserviceProvider,
    DataserviceProvider
  ]
})
export class AppModule {}
