import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subtask } from './subtask';
import { SubtaskService } from './subtask/subtask.service';
import { Todo } from './todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo = {
    id: 0,
    projectId: 0,
    statusId: 0,
    title: '',
    deadline: '',
    comment: '',
    color: '',
  };
  @Output() putTodo: EventEmitter<any> = new EventEmitter();

  subtasks: Subtask[] = [];
  addTaskClicked: Boolean = false;
  taskForm = new FormGroup({
    todoId: new FormControl(this.todo.id),
    title: new FormControl('', [Validators.required]),
    done: new FormControl(false),
  });
  constructor(private subtaskService: SubtaskService) {}
  onDelete() {
    this.subtaskService.getSubtasks(this.todo.id).subscribe((result) => {
      this.subtasks = result;
    });
  }
  onChangeSubtask(): void {
    this.subtaskService.getSubtasks(this.todo.id).subscribe((result) => {
      this.subtasks = result;
    });
  }
  editTodo(todo: Todo): void {
    this.putTodo.emit(todo);
  }
  addTask(): void {
    this.addTaskClicked = !this.addTaskClicked;
  }
  confirmTask(): void {
    this.subtaskService.postSubtask(this.taskForm.value).subscribe(
      (result) => {
        this.subtaskService
          .getSubtasks(this.todo.id)
          .subscribe((result) => (this.subtasks = result));
        this.cancelTask();
      },
      (error) => {
        alert(error.message);
      }
    );
  }
  cancelTask(): void {
    this.addTaskClicked = false;
    this.taskForm.setValue({
      todoId: this.todo.id,
      title: '',
      done: false,
    });
  }
  ngOnInit(): void {
    if (this.todo.id != 0) {
      this.subtaskService
        .getSubtasks(this.todo.id)
        .subscribe((result) => (this.subtasks = result));
      this.cancelTask();
    }
  }
}
