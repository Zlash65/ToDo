import { Component } from '@angular/core';
import { NavParams, NavController, ViewController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';
import { ToDoListPage } from '../../pages/to-do-list/to-do-list';
import { DisplayToDoPage } from '../../pages/display-to-do/display-to-do';

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
		private storage: Storage, public viewCtrl: ViewController) {
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
	}

	async itemClick(item) {

		switch(item.name) {
			case "settings":
				this.navCtrl.push(HomePage, {
					title: "Settings"
				});
				break;

			case "delete":
				await this.frappe.db.delete("ToDo", this.me.item.name)
					.then(r => {
						this.me.navCtrl.pop();
				});
				break;

			case "deleteMany":
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
		}

	}

	close() {
		this.viewCtrl.dismiss();
	}

}
