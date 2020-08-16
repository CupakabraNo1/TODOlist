import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoNotFoundComponent } from './todo-not-found.component';

describe('TodoNotFoundComponent', () => {
  let component: TodoNotFoundComponent;
  let fixture: ComponentFixture<TodoNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
