import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonListingComponent } from './components/person-listing/person-listing.component';
import { PersonUpsertComponent } from './components/person-upsert/person-upsert.component';
import { Route, RouterModule } from '@angular/router';
import { PersonListingResolver } from './_resolvers/person-listing.resolver';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Route[] = [
  {
    path: '',
    component: PersonListingComponent,
    resolve: { people: PersonListingResolver },
  }
];

@NgModule({
  declarations: [
    PersonListingComponent,
    PersonUpsertComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PersonModule { }
