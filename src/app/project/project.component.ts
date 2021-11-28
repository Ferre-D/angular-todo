import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoService } from '../project-detail/todo/todo.service';
import { Project } from './project';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @Input() project: Project = { id: 0, name: '', createdAt: '' };
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  constructor(
    private todoService: TodoService,
    private projectService: ProjectService
  ) {}
  tasks: number = 0;

  ngOnInit(): void {
    this.todoService
      .getTodos(this.project.id)
      .subscribe((result) => (this.tasks = result.length));
  }
  delete(id: number): void {
    this.projectService.deleteProject(id).subscribe(
      (result) => {
        this.onDelete.emit();
      },
      (error) => {
        //error
        alert(error);
      }
    );
    this.onDelete;
  }
}
