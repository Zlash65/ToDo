import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { ToDoListPage } from '../to-do-list/to-do-list';
import { PopoverComponent } from '../../components/popover/popover';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-display-to-do',
  templateUrl: 'display-to-do.html',
})
export class DisplayToDoPage {
	item:any;
	title:any;
	me:any;
	statusList:Array<String>;
	@Input() subject;
	@Input() description;
	@Input() status;
	disabled:Boolean;
	frappe:any;
	popover:any;
	update:any;


	constructor(public navCtrl: NavController, public navParams: NavParams,
		public popoverCtrl: PopoverController, private network: Network, private storage: Storage) {
			// watch network for a connection
			this.network.onConnect().subscribe(() => {
				console.log('network connected!');
			});

			// watch network for a disconnection
			this.network.onDisconnect().subscribe(() => {
				console.log('network disconnected!');
			});
		}

	ionViewDidLoad() {
		this.statusList = ["Open", "Closed"];
		this.frappe = (<any>window).frappe;
		this.disabled =  this.navParams.get('disabled');
		this.update =  this.navParams.get('update');
		this.item = this.navParams.get('item');
		if(this.item) {
			this.title = this.item.name;
			this.subject = this.item.subject;
			this.description = this.item.description;
			this.status = this.item.status;
		} else {
			this.title = "New Todo";
		}
	}

	ionViewCanLeave() {
		if(this.popover) {
			this.popover.dismiss();
			this.popover = null;
		}
		if(this.update) {
			this.navCtrl.push(ToDoListPage);
		}
	}

	async saveToDo() {
		let temp_data = {"subject": this.subject, "description": this.description, "status": this.status };
		if(this.network.type=='wifi' || this.network.type=='4g' || this.network.type=='3g') {
			await this.frappe.db.insert("ToDo", temp_data)
				.then(r => {
					this.item = r;
					this.title = this.item.name;
			});
			let temp;
			await this.storage.get("serv_data").then(r => {
				temp = r.concat(this.item);
			});
			await this.storage.set("serv_data", temp);
		}
		else {
			let temp;
			await this.storage.get("local_data").then(r => {
				temp = r.concat(temp_data);
			});
			await this.storage.set("local_data", temp).then(r => {
			});
			this.title = "ToDo";
		}
		this.disabled = true;
		this.update = false;
	}

	async updateToDo() {
		this.item.subject = this.subject;
		this.item.status = this.status;
		this.item.description = this.description;
		if(this.network.type=='wifi' || this.network.type=='4g' || this.network.type=='3g') {
			await this.frappe.db.update("ToDo", this.item)
				.then(r => {
			});
		}
		else {
			let temp;
			await this.storage.get("local_data").then(r => {
				temp = r.concat([this.item]);
			});
			await this.storage.set("local_data", temp);
		}
		this.disabled = true;
		this.update = false;
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
