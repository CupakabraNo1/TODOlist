import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";
import { ServerResponse } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.less"],
})
export class AuthComponent implements OnInit, OnDestroy {
  register: boolean = false;
  isLoading: boolean = false;
  private sub: Subscription = null;
  error: string = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.register = params["id"] == 1 ? true : false;
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    let auth: Observable<ServerResponse>;
    this.isLoading = true;

    if (this.register) {
      auth = this.auth.register(form.value.email, form.value.password);
    } else {
      auth = this.auth.login(form.value.email, form.value.password);
    }

    auth.subscribe(
      (data) => {
        console.log(data);
        this.error = null;
        this.isLoading = false;
        this.router.navigate(["/todo"]);
      },
      (error) => {
				console.log(error);
				this.error = error;
				this.isLoading = false;
			}
		);
		
		form.reset();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
