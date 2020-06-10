import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { 
    path: "", 
    redirectTo: "/home", 
    pathMatch: "full"
  },
  { 
    path: "home", 
    component: HomeComponent, 
  },
  {
    path: "auth",
    loadChildren: "./auth/auth.module#AuthModule",
  },
  {
    path: "todo",
    loadChildren: "./todo/todo.module#TodoModule",
  }
  // {
  //   path: "**",
  //   comp
  // }
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
