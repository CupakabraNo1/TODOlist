import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoNotFoundComponent } from '../shared/components/todo-not-found/todo-not-found.component';
import { UserComponent } from './user/user.component';
import { TrashComponent } from './trash/trash.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddNewComponent } from './components/home/add-new/add-new.component';
import { TodoListComponent } from './components/home/todo-list/todo-list.component';
import { AddCategoryComponent } from './components/home/add-category/add-category.component';
import { CategoryListComponent } from './components/home/category-list/category-list.component';

const routes: Routes = [
  { path: "", redirectTo: "todo", pathMatch: "full" },
  { path: "todo", component: HomeComponent },
  { path: "user", component: UserComponent },
  { path: "trash", component: TrashComponent },
  { path: "**", component: TodoNotFoundComponent }
]

@NgModule({
  declarations: [
    HomeComponent,
    UserComponent,
    TrashComponent,
    AddNewComponent,
    TodoListComponent,
    AddCategoryComponent,
    CategoryListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatCheckboxModule,


  ],
  exports: [
    RouterModule
  ]
})
export class TodoModule { }
