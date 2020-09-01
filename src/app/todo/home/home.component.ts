import {
  Component,
  OnInit,
  HostListener,
  OnDestroy,
  Input,
} from "@angular/core";
import { Todo } from "src/app/models/todo.model";
import { Category } from "src/app/models/category.model";
import { Subscription } from "rxjs";
import { CategoriesService } from "src/app/shared/services/categories.service";
import { UserDetails } from "src/app/models/user-details.model";
import { UserService } from "src/app/shared/services/user.service";
import { AuthService } from "src/app/auth/auth.service";
import { User } from "src/app/models/user.model";
import { TodoService } from "src/app/shared/services/todo.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"],
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly SHOW_CATEGORIES_BREAKPOINT = 992;

  user: User;
  userSub: Subscription;

  userData: UserDetails;
  userDataSub: Subscription;

  showCategories = true;
  showTodos = true;

  todoList: Todo[];
  todoSub: Subscription;

  categories: Category[];
  categoriesSub: Subscription;

  lastIndex: number = 0;

  lastIndexTodo: number = 0;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private categoryService: CategoriesService,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.onResize(null);
    this.userSub = this.auth.user.subscribe((user: User) => {
      this.user = user;
    });

    this.userDataSub = this.userService
      .getUserData(this.user.id)
      .subscribe((userDetails: any) => {
        if (userDetails) {
          this.userData = userDetails as UserDetails;
          this.getCategories();

          this.getTodos();
        }
      });
    console.log(this.todoList);
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    if (window.innerWidth >= this.SHOW_CATEGORIES_BREAKPOINT) {
      if (!this.showTodos) {
        this.showTodos = true;
      }
      this.showCategories = true;
    } else {
      this.showCategories = false;
      if (!this.showTodos) {
        this.showTodos = false;
        this.showCategories = true;
      }
    }
  }

  getCategories() {
    this.categories = [];
    this.categoriesSub = this.categoryService
      .getCategories()
      .subscribe((data: Category[]) => {
        if (data && data.length > 0) {
          data.forEach((category: Category) => {
            if (category) {
              if (category.id > this.lastIndex) {
                this.lastIndex = category.id;
              }
              this.categories.push(category);
            }
          });
        } else {
          var keys = data ? Object.keys(data) : null;
          if (keys && keys.length > 0) {
            keys.forEach((key) => {
              this.categories.push(data[key] as Category);
            });
          }
        }
      });
  }

  getTodos() {
    this.todoSub ? this.todoSub.unsubscribe : null;
    this.todoList = [];
    this.todoSub = this.todoService
      .getTodsForClient()
      .subscribe((data: Todo[]) => {
        if (data && data.length > 0) {
          data.forEach((todo: Todo) => {
            if (todo) {
              if (todo.id > this.lastIndexTodo) {
                this.lastIndexTodo = todo.id;
              }
              this.todoList.push(todo);
            }
          });
        } else {
          var keys = data ? Object.keys(data) : null;
          if (keys && keys.length > 0) {
            keys.forEach((key) => {
              this.todoList.push(data[key]);
            });
          }
        }
      });
  }

  switchCategories(on: boolean) {
    this.showCategories = on;
    this.showTodos = !on;
  }

  updateLastTodo(event: number) {
    this.lastIndexTodo = event;
  }

  ngOnDestroy() {
    this.todoSub ? this.todoSub.unsubscribe() : null;
    this.categoriesSub ? this.categoriesSub.unsubscribe() : null;
    this.userSub ? this.userSub.unsubscribe() : null;
    this.userDataSub ? this.userDataSub.unsubscribe() : null;
  }
}
