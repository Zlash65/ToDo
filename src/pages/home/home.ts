import { Component, Input, ViewChild } from '@angular/core';
import { NavController, LoadingController, ToastController, NavParams } from 'ionic-angular';
import initFrappe from "../../frappe";
import { ToDoListPage } from '../to-do-list/to-do-list';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	frappe:any;
	server_list: Array<String> = [];
	save_connect:String;
	@Input() server;

	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
		private storage: Storage, private toastCtrl: ToastController,
		public navParams: NavParams, private httpClient: HttpClient) {
			this.frappe = (<any>window).frappe;
			this.setupLocalData();
	}

	async ionViewDidLoad() {
		await this.storage.get("servers").then(servers => {
			if(servers){
				this.server_list = servers;
			} else {
				this.server_list = [];
			}
		});
	}

	validate_server(server: string) {
		let me = this;

		if(!server) {
			this.retry_server();
			return false;
		} 

		select(server);

		function select(server) {
			server = me.strip_trailing_slash(server);
			me.save_server_in_recent(server);
			me.connect(server);
		}

	}

	retry_server() {
		alert('Does not seem like a valid server address. Please try again.');
		return;
	}

	strip_trailing_slash(server) {
        return server.replace(/(http[s]?:\/\/[^\/]*)(.*)/, "$1");
	}
	
	async save_server_in_recent(server) {
		// retrieve server list from storage. Add server to the list if not already in it.
		await this.storage.get("servers").then(result => {
			if(result){
				if(!result.includes(server)){
					result.push(server);
					this.server_list = result;
				}
			} else {
				this.server_list.push(server);
			}
		});
		this.server_list.reverse().splice(2);
		this.storage.set("servers", this.server_list);
	}

	fillServer(server) {
		this.server = server;
	}

	async connect(server) {
		let me = this;

		await initFrappe(this.server).then(r => {
			me.frappe = r;
			me.storage.set("server", me.server);
			me.navCtrl.push(LoginPage);
		});
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
