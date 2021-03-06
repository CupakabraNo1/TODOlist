import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';


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
