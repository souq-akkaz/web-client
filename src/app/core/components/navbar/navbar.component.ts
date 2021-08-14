import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../pages/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userAuth$ = this._authService.selectState('userAuth');
  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
  }

}
