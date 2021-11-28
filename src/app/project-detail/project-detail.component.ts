import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Todo } from './todo/todo';
import { TodoService } from './todo/todo.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  todos: Todo[] = [];
  todosFilterReset: Todo[] = [];

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute
  ) {}
  isEdit: Boolean = false;
  todo: number = 0;
  doing: number = 0;
  done: number = 0;
  color: string = '#3777ff';
  editTodoId: number = 0;

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId != null) {
      this.todoService.getTodos(+projectId).subscribe((result) => {
        this.todos = result;
        this.todosFilterReset = this.todos;
        result.map((r) => {
          if (r.statusId == 1) this.todo++;
          else if (r.statusId == 2) this.doing++;
          else if (r.statusId == 3) this.done++;
        });
      });
    }
  }
  onSubmit(): void {
    if (this.isEdit) {
      this.todoService.putTodo(this.todoForm.value, this.editTodoId).subscribe(
        (result) => {
          const projectId = this.route.snapshot.paramMap.get('id');

          if (projectId != null) {
            this.todo = 0;
            this.doing = 0;
            this.done = 0;
            this.todoService.getTodos(+projectId).subscribe((result) => {
              this.todos = result;
              this.todosFilterReset = this.todos;
              result.map((r) => {
                if (r.statusId == 1) this.todo++;
                else if (r.statusId == 2) this.doing++;
                else if (r.statusId == 3) this.done++;
              });
            });
          }
        },
        (error) => {
          alert(error.message);
        }
      );
    } else {
      this.todoService.postTodo(this.todoForm.value).subscribe(
        (result) => {
          const projectId = this.route.snapshot.paramMap.get('id');

          if (projectId != null) {
            this.todo = 0;
            this.doing = 0;
            this.done = 0;
            this.todoService.getTodos(+projectId).subscribe((result) => {
              this.todos = result;
              this.todosFilterReset = this.todos;
              result.map((r) => {
                if (r.statusId == 1) this.todo++;
                else if (r.statusId == 2) this.doing++;
                else if (r.statusId == 3) this.done++;
              });
            });
          }
        },
        (error) => {
          alert(error.message);
        }
      );
      this.todoForm.setValue({
        projectId: this.route.snapshot.paramMap.get('id'),
        statusId: 1,
        title: '',
        comment: '',
        deadline: '',
        color: '#3777ff',
      });
    }

    this.isEdit = false;
  }
  todoForm = new FormGroup({
    projectId: new FormControl(this.route.snapshot.paramMap.get('id')),
    statusId: new FormControl(1),
    title: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    comment: new FormControl('', [
      Validators.nullValidator,
      Validators.maxLength(250),
    ]),
    deadline: new FormControl(''),
    color: new FormControl(''),
  });
  resetModal() {
    this.isEdit = false;
    this.todoForm.setValue({
      projectId: this.route.snapshot.paramMap.get('id'),
      statusId: 1,
      title: '',
      comment: '',
      deadline: '',
      color: '#3777ff',
    });
  }
  putTodo(todoTemp: Todo): void {
    this.editTodoId = todoTemp.id;
    this.isEdit = true;
    this.todoForm.setValue({
      projectId: todoTemp.projectId,
      statusId: todoTemp.statusId,
      title: todoTemp.title,
      comment: todoTemp.comment,
      deadline: todoTemp.deadline,
      color: todoTemp.color,
    });
  }
  onlyShowTodo(): void {
    this.todos = this.todosFilterReset;
    this.todos = this.todos.filter((todo) => todo.statusId == 1);
  }
  onlyShowDoing(): void {
    this.todos = this.todosFilterReset;
    this.todos = this.todos.filter((todo) => todo.statusId == 2);
  }
  onlyShowDone(): void {
    this.todos = this.todosFilterReset;
    this.todos = this.todos.filter((todo) => todo.statusId == 3);
  }
  showAll(): void {
    this.todos = this.todosFilterReset;
  }
}
