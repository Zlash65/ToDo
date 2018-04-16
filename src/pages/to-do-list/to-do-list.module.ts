import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ToDoListPage } from './to-do-list';

@NgModule({
  declarations: [
    ToDoListPage,
  ],
  imports: [
    IonicPageModule.forChild(ToDoListPage),
  ],
})
export class ToDoListPageModule {}
