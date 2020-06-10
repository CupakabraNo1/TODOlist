import { Injectable } from '@angular/core';
import { UserDetails } from '../models/user-details.model';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({providedIn:'root'})
export class UserService {

    public user:UserDetails;
    
    USER_DATABASE = 'https://todolist-19e8d.firebaseio.com/users.json';

    constructor(private http: HttpClient){}

    public initiateUser(){
        
    }

    public getUser(id:string){

    }


}