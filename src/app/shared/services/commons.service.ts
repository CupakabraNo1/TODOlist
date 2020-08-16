import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {

  constructor() { }

  counter(i: number) {
    if(i && i > 0){
      return new Array(i);
    }else{
      return [];
    }
  }
}
