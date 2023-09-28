import { Component,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('search') searchElement: ElementRef | any;
  isDisplayed: boolean = false;
  constructor(private dashboard: DashboardService){}
  ngAfterViewInit(): void {
    //this.searchElement.nativeElement.focus();
  }
  toggleDisplay(){
    this.isDisplayed = true;
    console.log(this.searchElement);
    
    this.searchElement.nativeElement.focus();
  }
  subscribe(){
    this.dashboard.subscription();
  }
}
