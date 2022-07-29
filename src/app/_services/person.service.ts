import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PersonDetails } from '../_models/person/person-details';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  constructor() {
  }

  people: PersonDetails[] = [
    {id: 1, name: 'John Doe', email: 'test@test.test', dob: new Date('1/1/1980'), country: 'Belgium'},
    {id: 2, name: 'Ahmed El Sherif', email: 'a-icon73.5@hotmail.com', dob: new Date('1/19/1996'), country: 'Egypt'}
  ];

  // returning an observable of a shallow copy with a delay to simulate API call
  getListing(): Observable<PersonDetails[]> {
    return of([...this.people]).pipe(delay(500));
  }

  post(person: PersonDetails): Observable<PersonDetails> {
    person.id = this.people.length > 0 ? Math.max(...this.people.map(x => Number(x.id))) + 1 : 1;
    this.people.push(person);
    return of(person).pipe(delay(500));
  }

  update(person: PersonDetails): Observable<PersonDetails> {
    const indexToUpdate = this.people.findIndex(x => x.id === person.id);
    this.people[indexToUpdate] = person;
    return of(person).pipe(delay(500));
  }
}
