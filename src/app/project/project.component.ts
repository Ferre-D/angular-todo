import { Component, Input, OnInit } from '@angular/core';
import { Project } from './project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @Input() project: Project = { id: 0, name: '', createdAt: '', teamId: 0 };

  constructor() {}

  ngOnInit(): void {}
}