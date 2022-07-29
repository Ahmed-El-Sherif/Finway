import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { LoadingSpinnerService } from '../../_services/loading-spinner.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.sass']
})
export class LoadingSpinnerComponent implements OnInit {

  constructor(private router: Router, public loader: LoadingSpinnerService) {
    router.events.subscribe((event) => {
      this.navigationInterceptor(event as RouterEvent);
    });
  }

  ngOnInit(): void {
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
        this.loader.start();
    }
    if (event instanceof NavigationEnd) {
        this.loader.stop();
    }
    if (event instanceof NavigationCancel) {
        this.loader.stop();
    }
    if (event instanceof NavigationError) {
        this.loader.stop();
    }
  }
}
