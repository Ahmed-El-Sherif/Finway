import { AgePipe } from './_pipes/age.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListingCardComponent } from './components/item-listing-card/item-listing-card.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { VirtualKeyboardComponent } from './components/virtual-keyboard/virtual-keyboard.component';



@NgModule({
  declarations: [
    ItemListingCardComponent,
    LoadingSpinnerComponent,
    VirtualKeyboardComponent,
    AgePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ItemListingCardComponent,
    LoadingSpinnerComponent,
    VirtualKeyboardComponent,
    AgePipe
  ]
})
export class SharedModule { }
