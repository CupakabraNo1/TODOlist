import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/models/category.model';
import { UserService } from './user.service';
import { Todo } from 'src/app/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  readonly API_PREFIX = "/categories/"

  constructor(private http: HttpClient, private userService: UserService) { }

  public getCategories() {
    return this.http.get(this.API_PREFIX + this.userService.userId + ".json");
  }

  public addNewCategory(category: Category) {
    return this.http.patch(this.API_PREFIX + this.userService.userId + ".json?", {
      [category.id]: category
    });
  }

  public deleteCategory(id: number) {
    return this.http.delete(this.API_PREFIX + this.userService.userId + "/" + id + ".json");
  }

  // public updateCategory(id: number, number: number){
  //   return this.http.patch(this.API_PREFIX+this.userService.userId+"/"+id+".json", {"number":number});
  // }
}
