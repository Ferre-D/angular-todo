import { Component, OnInit } from '@angular/core';
import { Project } from '../project/project';
import { ProjectService } from '../project/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  project: Project = { id: 0, teamId: 0, name: '', createdAt: '' };

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId != null) {
      let projectTemp = this.projectService.getProjectById(+projectId) ?? null;
      if (projectTemp != null) {
        this.project = projectTemp;
      }
    }
  }
}
