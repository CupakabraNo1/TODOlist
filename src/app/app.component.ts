import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UserDetails } from './models/user-details.model';
import { Subscription } from 'rxjs';
import { User } from './models/user.model';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthService){}

  ngOnInit(): void {
    this.auth.autoLogin();
  }


}
