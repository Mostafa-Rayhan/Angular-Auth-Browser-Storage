import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  onLogout() {
    this.authService.logout();
  }
}
