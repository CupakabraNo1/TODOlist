import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/models/todo.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  readonly API_PREFIX = "/todos/";

  constructor(private http: HttpClient, private user: UserService) { }

  public getTodsForClient() {
    return this.http.get(this.API_PREFIX + this.user.userId + ".json");
  }

  public editTodo(todo: Todo) {
    return this.http.patch(this.API_PREFIX + this.user.userId + "/" + todo.id + ".json", todo);
  }

  public deleteTodo(todo: Todo){
    return this.http.delete(this.API_PREFIX + this.user.userId + "/" + todo.id + ".json" );
  }

  public addTodo(todo: Todo){
    return this.http.patch(this.API_PREFIX + this.user.userId + ".json", {[todo.id]: todo});
  }

}
