import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, throwError, Subscription } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "../models/user.model";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { UserService } from '../shared/services/user.service';
import { UserDetails } from '../models/user-details.model';

export interface ServerResponse {
  kind: string;
  idToken: string;
  email: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService implements OnDestroy{
  public user = new BehaviorSubject<User>(null);
  private expiresIn: any;

  userDetailsSub : Subscription;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  register(email: string, password: string) {
    return this.http
      .post<ServerResponse>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        environment.firebaseAPIkey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((data) => {
          this.handleAuthentication(
            data.email,
            data.localId,
            data.idToken,
            +data.expiresIn,
            true
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<ServerResponse>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        environment.firebaseAPIkey,
        {
          key: environment.firebaseAPIkey,
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((data) => {
          this.handleAuthentication(
            data.email,
            data.localId,
            data.idToken,
            +data.expiresIn,
            false
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    password: string,
    idToken: string,
    expiresIn: number,
    register: boolean
  ) {
    const expires = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, password, idToken, expires);
    this.user.next(user);
    // if(register){
    //   this.userDetailsSub = this.userService.addNewUser(new UserDetails(user.id, null,null,null,null,null)).subscribe((data:UserDetails)=>{
    //     this.userService.userData.next(data);
    //   })
    // }else{
    //   this.userDetailsSub = this.userService.getUserData(user.id).subscribe((data:UserDetails)=>{
    //     this.userService.userData.next(data);
    //   })
    // }
    localStorage.setItem("user", JSON.stringify(user));
    this.autoLoguout(expiresIn * 1000);
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem("user");
    this.router.navigate([""]);
    if (this.expiresIn) {
      clearTimeout(this.expiresIn);
    }
    this.expiresIn = null;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMess = "An unknown error occurred";
    if (!error.error || !error.error.error) {
      return throwError(errorMess);
    }
    switch (error.error.error.message) {
      case "EMAIL_EXISTS":
        errorMess = "This email exists already!";
        break;
      case "EMAIL_NOT_FOUND":
        errorMess = "This email does not exist!";
        break;
      case "INVALID_PASSWORD":
        errorMess = "This password is incorrect!";
        break;
    }
    return throwError(errorMess);
  }

  autoLogin() {
    const data: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("user"));

    if (!data) return;

    const user = new User(
      data.email,
      data.id,
      data._token,
      new Date(data._tokenExpirationDate)
    );
    if (user.token) {
      this.user.next(user);
      // this.userDetailsSub = this.userService.getUserData(user.id).subscribe((data:UserDetails)=>{
      //   this.userService.userData.next(data);
      // })
      this.autoLoguout(
        new Date(user._tokenExpirationDate).getTime() - new Date().getTime()
      );
    }
  }

  private autoLoguout(expires: number) {
    this.expiresIn = setTimeout(() => {
      this.logout();
    }, expires);
  }

  ngOnDestroy(){
    this.userDetailsSub.unsubscribe();
  }
}
