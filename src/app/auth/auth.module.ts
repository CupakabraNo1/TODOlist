import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule} from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor.service';
import { TodoNotFoundComponent } from '../shared/components/todo-not-found/todo-not-found.component';

const routes: Routes = [
  {path:'', component: AuthComponent},
  {path:"**", component: TodoNotFoundComponent}
]

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ],
  providers:[
    {provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor, multi:true}
  ]
})
export class AuthModule {

}
