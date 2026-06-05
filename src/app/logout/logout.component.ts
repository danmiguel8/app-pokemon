import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout-component',
  templateUrl: './logout.component.html',
  standalone: true
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
   
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

}
