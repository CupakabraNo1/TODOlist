import { Component, OnInit, HostListener } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  readonly SHOW_CATEGORIES_BREAKPOINT = 992;
  showCategories = true;
  showTodos = true;

  constructor() { }

  ngOnInit(): void {
    this.onResize(null);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth > this.SHOW_CATEGORIES_BREAKPOINT) {
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

  switchCategories(on: boolean) {
    this.showCategories = on;
    this.showTodos = !on;
  }


}
