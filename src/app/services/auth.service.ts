import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'auth_token';

  constructor(
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  login(username: string, password: string, rememberMe: boolean): void {
    const fakeToken = '1234567890abcdef'; // Simulate an auth token

    if (rememberMe) {
      this.localStorageService.setItem(this.tokenKey, fakeToken);
    } else {
      this.sessionStorageService.setItem(this.tokenKey, fakeToken);
    }
    
    this.cookieService.set('remember_me', rememberMe ? 'true' : 'false', 7);
    this.router.navigate(['/home']);
  }

  isAuthenticated(): boolean {
    return !!this.localStorageService.getItem(this.tokenKey) || !!this.sessionStorageService.getItem(this.tokenKey);
  }

  logout(): void {
    this.localStorageService.removeItem(this.tokenKey);
    this.sessionStorageService.removeItem(this.tokenKey);
    this.cookieService.delete('remember_me');
    this.router.navigate(['/login']);
  }
}
