import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ToDoListPage } from '../pages/to-do-list/to-do-list';
import { DisplayToDoPage } from '../pages/display-to-do/display-to-do';
import { LoginPage } from '../pages/login/login';
import { PopoverComponent } from '../components/popover/popover';
import initFrappe from "../frappe";
import { Network } from '@ionic-native/network';
import { HTTP } from '@ionic-native/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
	HomePage,
	ToDoListPage,
	DisplayToDoPage,
	LoginPage,
	PopoverComponent
  ],
  imports: [
	BrowserModule,
	HttpClientModule,
	IonicModule.forRoot(MyApp),
	IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
	HomePage,
	ToDoListPage,
	DisplayToDoPage,
	LoginPage,
	PopoverComponent
  ],
  providers: [
    StatusBar,
	SplashScreen,
	Network,
	HTTP,
	HttpClientModule,
	HttpClient,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
	constructor() {
		initFrappe();
	};
}
