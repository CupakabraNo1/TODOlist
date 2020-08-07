import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { TodoNotFoundComponent } from './shared/components/todo-not-found/todo-not-found.component';
import { AuthGard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "todo"
  },
  {
    path: "auth/:id",
    loadChildren: () => import("./auth/auth.module").then(mod => mod.AuthModule),
  },
  {
    path: "todo",
    loadChildren: () => import("./todo/todo.module").then(mod => mod.TodoModule),
    canActivate: [AuthGard]
  },
  { path: '**', component: TodoNotFoundComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
