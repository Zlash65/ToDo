import { Component } from '@angular/core';
import { NavParams, NavController, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';
import { ToDoListPage } from '../../pages/to-do-list/to-do-list';
import { DisplayToDoPage } from '../../pages/display-to-do/display-to-do';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {
	store:any;
	me:any;
	frappe:any;
	text: string;
	items:Array<any> = [];
	currentPage:any;

	constructor(public navParams:NavParams, public navCtrl: NavController,
		private storage: Storage, public viewCtrl: ViewController, private toastCtrl: ToastController,
		private loadingCtrl: LoadingController, private network: Network) {
		this.store = storage;
		this.frappe = (<any>window).frappe;
		this.me = this.navParams.get("me");
		this.prepareDropdown(this.me.navCtrl.getActive().component);
	}

	prepareDropdown(currentPage) {
		this.currentPage = currentPage;
		if(this.currentPage.name=="DisplayToDoPage") {
			this.items.push({name: "edit", label: "Edit"});
			this.items.push({name: "delete", label: "Delete"});
		}
		if(this.currentPage.name=="ToDoListPage") {
			this.items.push({name: "deleteMany", label: "Delete"});
		}
		this.items.push({label: "Settings", name: "settings"});
		this.items.push({label: "Sync Now", name: "sync_now"});
	}

	async itemClick(item) {

		switch(item.name) {
			case "settings":
				this.viewCtrl.dismiss();
				this.navCtrl.push(HomePage, {
					title: "Settings"
				});
				break;

			case "delete":
				if(this.delete_error()) break;
				await this.frappe.db.delete("ToDo", this.me.item.name)
					.then(r => {
						this.me.navCtrl.pop();
				});
				break;

			case "deleteMany":
				if(this.delete_error()) break;
				let names = [];
				let checkedBoxes = Array.from(document.querySelectorAll('.checkbox-checked'));
				checkedBoxes.forEach(element => { names.push(element.parentElement.id) });
				await this.frappe.db.deleteMany("ToDo", names)
					.then(r => {
						this.me.loadData();
						this.viewCtrl.dismiss();
				});
				break;

			case "edit":
				this.me.update = true;
				this.me.disabled = false;
				this.viewCtrl.dismiss();
				break;

			case "sync_now":
				if(this.network.type=='wifi' || this.network.type=='4g' || this.network.type=='3g') {
					this.viewCtrl.dismiss();
					let loading = this.loadingCtrl.create({
						content: 'Syncing...'
					});
					loading.present();
					let ld = [], temp_data, item, sd = [];
					await this.storage.get("local_data").then(r => {
						ld = r;
					});

					for (let i = 0; i < ld.length; i++) {
						item = ld[i]
						if(item) {
							temp_data = {"subject": item.subject, "description": item.description,
								"status": item.status};
						}
						await this.frappe.db.insert("ToDo", temp_data);
					}

					this.storage.set("local_data", []);
					loading.dismiss();
				} else {
					let toast = this.toastCtrl.create({
						message: 'Not connected to any network!',
						duration: 1000,
						position: 'bottom'
					});
					toast.present();
				}
				this.me.ionViewDidEnter();
				break;
		}

	}

	close() {
		this.viewCtrl.dismiss();
	}

	async delete_error() {
		let ld = []
		await this.storage.get("local_data").then(r => {
			ld = r;
		});

		if(ld.length>0) {
			let toast = this.toastCtrl.create({
				message: 'Please sync the data to avoid unwanted loss',
				duration: 1000,
				position: 'bottom'
			});
			toast.present();
			return true;
		} else {
			return false;
		}
	}

}
