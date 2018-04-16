import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { App } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { ToDoListPage } from '../pages/to-do-list/to-do-list';
import { DisplayToDoPage } from '../pages/display-to-do/display-to-do';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
	rootPage:any = HomePage;
	lastBack:any;

	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private app: App,
		public toastCtrl: ToastController) {

		platform.ready().then(() => {
		// Okay, so the platform is ready and our plugins are available.
		// Here you can do any higher level native things you might need.
		statusBar.styleDefault();
		splashScreen.hide();
	
		platform.registerBackButtonAction(fn => {
				const overlay = this.app._appRoot._overlayPortal.getActive();
				const nav = this.app.getActiveNav();

				if(overlay && overlay.dismiss) {
					overlay.dismiss();
				}
				else if(nav.getActive().instance instanceof HomePage
					|| nav.getActive().instance instanceof ToDoListPage) {
						if(Date.now() - this.lastBack < 500) {
							platform.exitApp();
						} else {
							let toast = this.toastCtrl.create({
								message: 'Press back twice to exit',
								duration: 1000,
								position: 'bottom'
							});
							
							toast.present();
						}
				}
				else if(nav.getActive().instance instanceof DisplayToDoPage) {
					nav.pop();
				}

				this.lastBack = Date.now();
			})
		});
	}
}

