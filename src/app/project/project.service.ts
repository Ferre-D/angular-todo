import { Injectable } from '@angular/core';
import { Project } from './project';
import { Todo } from '../project-detail/todo/todo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private httpClient: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>('http://localhost:3000/projects');
  }
  postProject(project: Project): Observable<Project> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Project>(
      'http://localhost:3000/projects',
      project,
      { headers: headers }
    );
  }
  deleteProject(id: number): Observable<Project> {
    return this.httpClient.delete<Project>(
      'http://localhost:3000/projects/' + id
    );
  }
}
