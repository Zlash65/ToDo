import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayToDoPage } from './display-to-do';

@NgModule({
  declarations: [
    DisplayToDoPage,
  ],
  imports: [
    IonicPageModule.forChild(DisplayToDoPage),
  ],
})
export class DisplayToDoPageModule {}
