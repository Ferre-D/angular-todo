import { Injectable } from '@angular/core';
import { Project } from './project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projects: Project[] = [];
  constructor() {
    let project1: Project = {
      id: 1,
      name: 'Angular TODO App',
      teamId: 0,
      createdAt: '22-12-2021',
    };
    let project2: Project = {
      id: 2,
      name: 'Flutter mobile development',
      teamId: 0,
      createdAt: '14-06-2022',
    };
    this.projects.push(project1);
    this.projects.push(project2);
  }

  getProjects(): Project[] {
    return this.projects;
  }
  getProjectById(id: number): Project | null {
    return this.projects.find((project) => project.id === id) ?? null;
  }
}
