import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../project/project';
import { ProjectService } from '../project/project.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}
  isSubmitted: boolean = false;
  project$: Subscription = new Subscription();
  postProject$: Subscription = new Subscription();
  projectForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    createdAt: new FormControl(new Date().toLocaleDateString()),
  });

  ngOnInit(): void {
    this.projectService
      .getProjects()
      .subscribe((result) => (this.projects = result));
  }
  onSubmit(): void {
    this.isSubmitted = true;
    this.postProject$ = this.projectService
      .postProject(this.projectForm.value)
      .subscribe(
        (result) => {
          this.projects.push(result);
        },
        (error) => {
          alert(error);
        }
      );
    this.projectForm.setValue({ name: '', createdAt: '' });
  }
  ngOnDestroy(): void {
    this.project$.unsubscribe();
    this.postProject$.unsubscribe();
  }
  onDelete() {
    this.projectService
      .getProjects()
      .subscribe((result) => (this.projects = result));
  }
}
