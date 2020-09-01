import { Injectable } from '@angular/core';
import { UserDetails } from 'src/app/models/user-details.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly API_PREFIX = "/users/";
  public userId = null;

  constructor(private http: HttpClient) {
  }

  public getUserData(id: string) {
    this.userId = id;
    return this.http.get(this.API_PREFIX + id + ".json");
  }

  public addNewUser(user: UserDetails) {
    this.userId = user.id;
    return this.http.patch("/users.json", {
      [user.id]: user
    });
  }

  public updateUser(user: UserDetails) {
    this.userId = user.id;
    return this.http.put(this.API_PREFIX + user.id + ".json", user);
  }

  // public refreshUser(id: string) {
  //   this.getUserData(id).subscribe((data: UserDetails) => this.userData.next(data)).unsubscribe();
  // }
}
