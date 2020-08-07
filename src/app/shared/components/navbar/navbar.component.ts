import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user.model';
import { UserDetails } from 'src/app/models/user-details.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private userSub:Subscription;
  private userDetailsSub: Subscription;
  isAuthenticated:boolean = false;
  userData: any;

  constructor(private userService: UserService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.isAuthenticated = user? true:false;
    });
    this.userDetailsSub = this.userService.userData.subscribe( (userData:UserDetails)=> {
      console.log(userData);
      this.userData = userData;
    })
  }

  logout(){
    this.auth.logout();
    this.router.navigate(["/auth/0"]);
  }

  alo(){
    console.log("hover");

  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
    this.userDetailsSub.unsubscribe();
  }
}
