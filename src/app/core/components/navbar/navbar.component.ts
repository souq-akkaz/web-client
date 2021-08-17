import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../pages/auth/services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userAuth$ = this._authService.selectState('userAuth');
  currentUserBalance!: number;
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this._userService.getCurrentUserbalance()
      .subscribe((resp) => {
        this.currentUserBalance = resp.balance;
      }); 
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
