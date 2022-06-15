import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  authenticated: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.authService.isLoggedIn)
    this.authenticated  = this.authService.isLoggedIn;
  }

  onLogout() {
    this.authService.logout();
  }
}
