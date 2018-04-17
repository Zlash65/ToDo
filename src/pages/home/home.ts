import { Component, Input, ViewChild } from '@angular/core';
import { NavController, LoadingController, ToastController, NavParams } from 'ionic-angular';
import initFrappe from "../../frappe";
import { ToDoListPage } from '../to-do-list/to-do-list';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	frappe:any;
	title:any;
	save_connect:String;
	@Input() user;
	@Input() server;

	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
		private storage: Storage, private network: Network, private toastCtrl: ToastController,
		public navParams: NavParams) {
		this.setupLocalData();
	}

	async ionViewDidEnter() {
		// watch network for a connection
		this.network.onConnect().subscribe(() => {
			console.log('network connected!');
		});

		// watch network for a disconnection
		this.network.onDisconnect().subscribe(() => {
			console.log('network disconnected!');
		});

		let temp = this.navParams.get("title");

		if(temp){
			this.title = temp;
			this.save_connect = "Save";
		} else {
			this.title = "ToDo";
			this.save_connect = "Connect";
		}

		this.frappe = (<any>window).frappe;

		await this.storage.get("user").then((val) => {
			if(val) {
				this.user = val;
			}
		});
		
		await this.storage.get("server").then((val) => {
			if(val) {
				this.server = val;
			}
		});

		if(this.user && this.server && this.title != "Settings") {
			this.connect();
		}
	}

	async connect() {
		var me = this;

		if(this.user) {
			this.storage.set('server', this.server);
			this.storage.set('user', this.user);
			await initFrappe(this.server).then(r => {
				this.frappe = r;
				me.navCtrl.push(ToDoListPage);
			});
		} else {
			let toast = this.toastCtrl.create({
				message: 'User is mandatory',
				duration: 2000,
				position: 'bottom'
			});
			
			toast.present();
		}
	}

	async setupLocalData() {
		await this.storage.get("local_data").then(r => {
			if(!r) {
				this.storage.set("local_data", []);
			}
		});
		await this.storage.get("serv_data").then(r => {
			if(!r) {
				this.storage.set("serv_data", []);
			}
		});
	}

}
