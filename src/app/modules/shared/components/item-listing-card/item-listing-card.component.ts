import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardField } from './../../../../_models/shared/card-field';
import { PrintingService } from '../../_services/printing.service';

@Component({
  selector: 'app-item-listing-card',
  templateUrl: './item-listing-card.component.html',
  styleUrls: ['./item-listing-card.component.sass']
})
export class ItemListingCardComponent implements OnInit {
  @Input()fields: CardField[] | undefined;
  @Input()item: any;
  @Input()canPrint = false;

  @Output()fieldClicked = new EventEmitter<string>();

  constructor(private printingService: PrintingService, private elRef: ElementRef) {
  }

  ngOnInit(): void {
    this.fields?.sort((a, b) => a.order - b.order);
  }

  onFieldClick(fieldTitle: string){
    this.fieldClicked.emit(fieldTitle);
  }

  printData(){
    this.printingService.printData(this.elRef.nativeElement.innerHTML);
  }
}
