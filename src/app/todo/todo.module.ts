import { NgModule } from '@angular/core';
import { TodoComponent } from './todo.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGard } from '../auth/auth.guard';

const routes: Routes = [
  {path: "todo", component:TodoComponent, canActivate: [AuthGard]}
]

@NgModule({
  declarations: [TodoComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})
export class TodoModule { }
