import { Component, OnInit, OnDestroy } from '@angular/core';
import { USER_DATA } from '../../app-constants';
import { UserService } from 'src/app/shared/services/user.service';
import { UserDetails } from 'src/app/models/user-details.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit, OnDestroy {

  readonly COMPONENT_ID = "user-component-"

  readonly USER_DATA = USER_DATA;

  headers: any[];

  userDetails: UserDetails;
  userDetailsSub: Subscription;

  user: User;
  userSub: Subscription;

  editMode = true;

  constructor(public userService: UserService, private auth: AuthService) { }

  ngOnInit(): void {
    this.headers = Object.values(this.USER_DATA);
    this.userSub = this.auth.user.subscribe( (user: User) => {
      this.user = user;
      this.getUserData(user.id);
    })

  }

  getUserData(id: string){
    this.userDetailsSub = this.userService.getUserData(id).subscribe( (userDetails:any) => {

      let fname = userDetails.fname ? userDetails.fname : "";
      let lname = userDetails.lname ? userDetails.lname : "";
      let sex = userDetails.sex ? userDetails.sex : "";
      let age = userDetails.age ? userDetails.age : 0;
      let description = userDetails.description ? userDetails.description : "";

      this.userDetails = new UserDetails(userDetails.id, fname, lname, age, sex, description);
    })
  }

  changeEdit(){
    this.editMode = !this.editMode;
  }

  saveEdited(){
    this.userDetailsSub = this.userService.updateUser(this.userDetails).subscribe((data: UserDetails) => {
      console.log(data);
      this.changeEdit();
    })
  }

  ngOnDestroy(): void {
    this.userDetailsSub.unsubscribe();
    this.userSub.unsubscribe();

  }
}
