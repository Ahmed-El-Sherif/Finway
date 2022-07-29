import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'People', loadChildren: () => import('./modules/person/person.module').then(m => m.PersonModule) },
  { path: '', redirectTo: 'People', pathMatch: 'full' },
  { path: '**', redirectTo: 'People', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
