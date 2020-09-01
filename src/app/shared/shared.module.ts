import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TodoNotFoundComponent } from './components/todo-not-found/todo-not-found.component';
import { HTTPInterceptor } from "./interceptors/http.interceptor";
import { SortPipe } from './pipes/sort.pipe'

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    TodoNotFoundComponent,
    SortPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NavbarComponent,
    FooterComponent,
    TodoNotFoundComponent,
    SortPipe
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HTTPInterceptor, multi: true }
  ]
})
export class SharedModule { }
