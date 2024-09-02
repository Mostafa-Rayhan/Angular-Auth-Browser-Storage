import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  jsonData: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.jsonData = this.authService.getStoredJsonData();
  }
}
