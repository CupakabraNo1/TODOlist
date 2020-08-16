import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonsService } from 'src/app/shared/services/commons.service';
import { Category } from 'src/app/models/category.model';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/shared/services/todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.less']
})
export class AddNewComponent implements OnInit {

  @Input() categories: Category[];
  @Input() lastTodo: number;

  todoSub: Subscription;
  @Output() added = new EventEmitter<boolean> ();

  constructor(public common: CommonsService, public todoService: TodoService) { }

  ngOnInit(): void {
  }

  addNew(form: NgForm) {
    if (!form.value.todo || form.value.todo === "") {
      return;
    }
    var priority = form.value.priority === "" ? -1 : +form.value.priority;
    var category = form.value.category === "" ? -1 : +form.value.category;

    var newTodo = new Todo(this.lastTodo + 1, form.value.todo, form.value.date, priority, false, category);
    this.todoSub = this.todoService.addTodo(newTodo).subscribe( () => {
      this.added.emit(true);
    })
    form.reset();

  }

}
