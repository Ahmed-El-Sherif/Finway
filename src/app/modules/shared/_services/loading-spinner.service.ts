import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoadingSpinnerService {
  loadingVisible = false;

  constructor() { }

  start(){
    this.loadingVisible = true;
  }

  stop(){
    this.loadingVisible = false;
  }
}
