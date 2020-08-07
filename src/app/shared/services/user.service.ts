import { Injectable } from '@angular/core';
import { UserDetails } from 'src/app/models/user-details.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userData = new BehaviorSubject<UserDetails>(null);

  constructor(private http: HttpClient) {
  }

  public getUserData(id: string) {
    return this.http.get("https://todolist-19e8d.firebaseio.com/users/" + id + ".json");
  }

  public addNewUser(user: UserDetails) {
    return this.http.patch("https://todolist-19e8d.firebaseio.com/users.json?", {
      [user.id]: user
    });
  }

  public updateUser(user: UserDetails) {
    return this.http.put("https://todolist-19e8d.firebaseio.com/users/" + user.id + ".json", user);
  }

  public refreshUser(id: string) {
    this.getUserData(id).subscribe((data: UserDetails) => this.userData.next(data)).unsubscribe();
  }
}
