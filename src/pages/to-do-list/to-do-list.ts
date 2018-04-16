import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,
	PopoverController, ViewController, ToastController, App } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { DisplayToDoPage } from '../display-to-do/display-to-do';
import { PopoverComponent } from '../../components/popover/popover';

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
		private storage: Storage, private viewCtrl: ViewController, private app: App) { }

	async ionViewDidLoad() {
		this.frappe = (<any>window).frappe;
	}

	ionViewCanLeave() {
		if(this.popover) {
			this.popover.dismiss();
			this.popover = null;
		}
	}

	ionViewDidEnter() {
		this.loadData();
	}

	async loadData() {
		let exception = null;
		try {
			await this.frappe.db.getAll({doctype: "ToDo",
				fields: ["name", "status", "description", "subject"]}).then(r => {
				this.data = r;
			});
		} catch (error) {
			exception = error;
			let toast = this.toastCtrl.create({
				message: 'Server unreachable',
				duration: 2000,
				position: 'bottom'
			});
			
			toast.present();
			this.navCtrl.popToRoot();

		}

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
