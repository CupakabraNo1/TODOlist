import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private user:Subscription;
  isAuthenticated:boolean = false;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.user = this.auth.user.subscribe(user => {
      console.log(user);
      
      this.isAuthenticated = user? true:false;
    });
  }

  logout(){
    this.auth.logout();
  }

  ngOnDestroy(){
    this.user.unsubscribe();
  }
}
