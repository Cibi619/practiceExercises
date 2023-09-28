import { Component } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
    constructor(private dashboard: DashboardService){}
    subscribe() {
        this.dashboard.subscription();
    }
}
