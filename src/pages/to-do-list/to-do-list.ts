import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,
	PopoverController, ViewController, ToastController, App, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { DisplayToDoPage } from '../display-to-do/display-to-do';
import { PopoverComponent } from '../../components/popover/popover';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-to-do-list',
  templateUrl: 'to-do-list.html',
})
export class ToDoListPage {
	data:any[];
	me:any;
	frappe:any;
	popover:any;

	constructor(public navCtrl: NavController, public navParams: NavParams,
		private toastCtrl: ToastController, public popoverCtrl: PopoverController,
		private storage: Storage, private viewCtrl: ViewController, private app: App,
		private network: Network, public loadingCtrl: LoadingController) { }

	doRefresh(refresher) {
		this.ionViewDidEnter();
		refresher.complete();
	}

	async ionViewDidLoad() {
		this.frappe = (<any>window).frappe;
	}

	ionViewCanLeave() {
		if(this.popover) {
			this.popover.dismiss();
			this.popover = null;
		}
	}

	async ionViewDidEnter() {

		await this.storage.get("token").then(r => {
			if(r) {
				if(!this.frappe.session) this.frappe.session = {"token": r};
				else this.frappe.session["token"] = r;
			}
		});

		if(this.popover){
			this.popover.dismiss();
			this.popover = null;
		}

		let loading = this.loadingCtrl.create({
			content: 'Refreshing'
		});
		loading.present();


		setTimeout(() => {
			if(this.network.type=='wifi' || this.network.type=='4g' || this.network.type=='3g') {
				this.loadData();
			}
			else {
				this.combinify();
			}
			loading.dismiss();
		  }, 1000);
	}

	async loadData() {
		let exception = null;
		try {
			await this.frappe.db.getAll({doctype: "ToDo",
				fields: ["name", "status", "description", "subject"]}).then(r => {
				this.combinify(r);
			});
		} catch (error) {
			exception = error;
			let toast = this.toastCtrl.create({
				message: 'Server unreachable',
				duration: 1000,
				position: 'bottom'
			});
			
			toast.present();
		}
	}

	async combinify(serv_data=[]) {
		let ld = [];

		await this.storage.get("local_data").then(r => {
			ld = r;
		});

		if(serv_data.length <= 0){
			await this.storage.get("serv_data").then(r => {
				serv_data = r;
			});
		} else {
			await this.storage.set("serv_data", serv_data);
		}
		console.log(ld, serv_data);
		this.data = ld.concat(serv_data);
	}

	displayTodo(item) {
		this.navCtrl.push(DisplayToDoPage, {
			item: item,
			disabled: true
		});
	}

	addToDo() {
		this.navCtrl.push(DisplayToDoPage, {
			disabled: false
		});
	}

	presentPopover(myEvent) {
		if(!this.popover) {
			this.me = { me: this };
			this.popover = this.popoverCtrl.create(PopoverComponent, this.me, { cssClass: 'custom-popover'});
			this.popover.present({
				ev: myEvent
			});
		} else {
			this.popover.dismiss();
			this.popover = null;
		}
	}

}
