import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PersonDetails } from 'src/app/_models/person/person-details';
import { PersonService } from 'src/app/_services/person.service';

@Injectable({
  providedIn: 'root'
})
export class PersonListingResolver implements Resolve<PersonDetails[]> {
  constructor(private personService: PersonService) { }

  resolve(): Observable<PersonDetails[]> {
    return this.personService.getListing();
  }
}
