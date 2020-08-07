import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoNotFoundComponent } from '../shared/components/todo-not-found/todo-not-found.component';
import { UserComponent } from './user/user.component';
import { TrashComponent } from './trash/trash.component';

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
    TrashComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,

  ],
  exports: [
    RouterModule
  ]
})
export class TodoModule { }
