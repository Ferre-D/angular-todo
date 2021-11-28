import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subtask } from '../subtask';
import { SubtaskService } from './subtask.service';

@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.scss'],
})
export class SubtaskComponent implements OnInit {
  @Input() subtask: Subtask = {
    id: 0,
    todoId: 0,
    title: '',
    done: false,
  };
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  isChecked: Boolean = false;
  constructor(private subtaskService: SubtaskService) {}
  updateTask(): void {
    this.isChecked = !this.isChecked;
    this.subtask.done = this.isChecked;
    this.subtaskService.putSubtask(this.subtask.id, this.subtask).subscribe(
      (result) => {
        this.onChange.emit();
      },
      (error) => {
        alert(error.message);
      }
    );
  }
  deleteTask(): void {
    this.subtaskService.deleteSubtask(this.subtask.id).subscribe(
      (result) => {
        this.onDelete.emit();
      },
      (error) => {
        alert(error.message);
      }
    );
  }
  ngOnInit(): void {
    this.isChecked = this.subtask.done;
  }
}
