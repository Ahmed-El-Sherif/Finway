import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PrintingService {
  constructor() { }

  printData(html: string){
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt!.document.write(html);
    WindowPrt!.document.close();
    WindowPrt!.focus();
    WindowPrt!.print();
    WindowPrt!.close();
  }
}
