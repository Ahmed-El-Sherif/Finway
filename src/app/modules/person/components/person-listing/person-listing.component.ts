import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonDetails } from 'src/app/_models/person/person-details';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardField } from 'src/app/_models/shared/card-field';
import { FieldTypeEnum } from 'src/app/_models/shared/_enums/field-type.enum';

@Component({
  selector: 'app-person-listing',
  templateUrl: './person-listing.component.html',
  styleUrls: ['./person-listing.component.sass']
})
export class PersonListingComponent implements OnInit {
  @ViewChild("upsertModal") upsertModal: TemplateRef<any> | undefined;

  people: PersonDetails[];
  selectedPerson: PersonDetails | undefined;
  personCardFields: CardField[] = [
    {property: "name", title: "Name", type: FieldTypeEnum.string, clickable: true, order: 1},
    {property: "email", title: "Email", type: FieldTypeEnum.string, clickable: false, order: 2},
    {property: "dob", title: "Age", type: FieldTypeEnum.age, clickable: false, order: 3}
  ];

  constructor(private activatedRoute: ActivatedRoute, private modalService: NgbModal) {
    this.people = this.activatedRoute.snapshot.data['people'];
  }

  ngOnInit(): void {
  }

  openUpsert(index?: number){
    if (index !== undefined) {
      this.selectedPerson = this.people[index];
    } else {
      this.selectedPerson = undefined;
    }
    this.modalService.open(this.upsertModal, {ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false}).result;
  }

  onPersonAdded(person: PersonDetails){
    this.people.push(person);
  }

  onPersonUpdated(person: PersonDetails){
    const updatedPersonIndex = this.people.findIndex(p => p.id == person.id);
    this.people[updatedPersonIndex] = person;
  }

  onFieldClicked(fieldTitle: string, index: number) {
    if (fieldTitle == "Name"){
      this.openUpsert(index);
    }
  }
}
