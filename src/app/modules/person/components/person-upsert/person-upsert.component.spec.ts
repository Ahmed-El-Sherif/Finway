import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonUpsertComponent } from './person-upsert.component';

describe('PersonUpsertComponent', () => {
  let component: PersonUpsertComponent;
  let fixture: ComponentFixture<PersonUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonUpsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
