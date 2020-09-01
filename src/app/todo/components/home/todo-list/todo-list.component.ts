import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from "@angular/core";
import { UserDetails } from "src/app/models/user-details.model";
import { Subscription } from "rxjs";
import { Todo } from "src/app/models/todo.model";
import { TodoService } from "src/app/shared/services/todo.service";
import { Category } from "src/app/models/category.model";
import { CommonsService } from "src/app/shared/services/commons.service";
import { exhaustMap, take, tap } from "rxjs/operators";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.less"],
})
export class TodoListComponent implements OnInit, OnDestroy {
  @Input() todoList: Todo[];
  @Input() user: UserDetails;
  @Input() categories: Category[];

  @Output() changed = new EventEmitter<boolean>();

  todoSub: Subscription;

  edit = {
    edit: false,
    idForEdit: -1,
  };

  items = [];

  constructor(
    private todoService: TodoService,
    public common: CommonsService
  ) {}

  ngOnInit(): void {
    console.log(this.todoList);
    console.log(this.categories);
  }

  completeTask(todo: Todo) {
    if (this.edit.edit && this.edit.idForEdit === todo.id) {
      this.edit.edit = false;
      this.edit.idForEdit = -1;
    }
    todo.status = !todo.status;
    this.updateDatabase(todo);
  }

  editTask(task: Todo) {
    if (this.edit.edit) {
      return;
    }
    this.edit.edit = true;
    this.edit.idForEdit = task.id;
  }

  saveTask(todo: Todo) {
    if (!this.edit.edit) {
      return;
    }
    this.edit.edit = false;
    this.edit.idForEdit = -1;

    this.updateDatabase(todo);
  }

  updateDatabase(todo: Todo) {
    todo.category = +todo.category;
    todo.priority = +todo.priority;
    this.todoSub = this.todoService.editTodo(todo).subscribe(() => {});
  }

  deleteTask(todo: Todo) {
    this.todoSub ? this.todoSub.unsubscribe() : null;
    this.todoSub = this.todoService.deleteTodo(todo).subscribe((data: any) => {
      console.log("obrisano");
      console.log(data);
      this.changed.emit(true);
    });
  }

  getCategoryName(id: number): string {
    let cat = new Category(-1, "no category");
    if (this.categories && this.categories.length > 0) {
      this.categories.forEach((category: Category) => {
        if (+category.id === id) {
          cat = category;
        }
      });
    }
    return cat.name;
  }

  ngOnDestroy(): void {
    if (this.todoSub) {
      this.todoSub.unsubscribe();
    }
  }
}
