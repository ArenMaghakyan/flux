import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../core/services/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  public onLogout(): void {
    this.authService.logOut();
  }

}
