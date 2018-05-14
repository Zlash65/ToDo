import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import fetch from 'node-fetch';
import { ToDoListPage } from '../to-do-list/to-do-list';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	frappe:any;
	server:String;
	signup:Boolean;
	@Input() email;
	@Input() first_name;
	@Input() password;

	constructor(public navCtrl: NavController, public navParams: NavParams,
		private storage: Storage, private network: Network, private toastCtrl: ToastController) {
		this.frappe = (<any>window).frappe;
		this.disable_signUp();
	}

  	ionViewDidEnter() {
		setTimeout(() => {
			if(!(this.network.type=='wifi' || this.network.type=='4g' || this.network.type=='3g')) {
				// offline route
			}
		  }, 1000);
	}

	async ionViewDidLoad() {
		let me = this;
		await this.storage.get("server")
			.then(r => {
				me.server = r;
			})
	}

	async login() {
		let me = this;

		if(this.email && this.password) {
			await this.frappe.login(this.email, this.password)
				.then(r => {
					if(r && r.token) {
						if(!me.frappe.session) me.frappe.session = {"token": r.token};
						else me.frappe.session["token"] = r.token;
						me.storage.set("token", r.token);
						me.navCtrl.push(ToDoListPage);
					} else {
						me.show_toast(r.statusText);
					}
				})
		} else {
			let message = "Email missing.";
			if(this.email && !this.password) message = "Password missing."
			this.show_toast(message);
		}
	}

	signUp() {
		this.frappe.signup(this.email, this.first_name, this.password)
			.then(r => {
				if(r && r.ok==false) {
					this.show_toast("Email already exist!")
				} else {
					this.show_toast("User created.");
					this.disable_signUp();
				}
			})
	}

	enable_signUp() {
		this.signup = true;
	}

	disable_signUp() {
		this.signup = false;
	}

	change_server() {
		this.navCtrl.pop();
	}

	show_toast(message, time=1000, position="bottom") {
		let toast = this.toastCtrl.create({
			message: message,
			duration: time,
			position: position
		});
		
		toast.present();
	}

}
