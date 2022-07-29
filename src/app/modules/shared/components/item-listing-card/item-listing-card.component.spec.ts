import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListingCardComponent } from './item-listing-card.component';

describe('ItemListingCardComponent', () => {
  let component: ItemListingCardComponent;
  let fixture: ComponentFixture<ItemListingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemListingCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemListingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
