import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subtask } from '../subtask';

@Injectable({
  providedIn: 'root',
})
export class SubtaskService {
  constructor(private httpClient: HttpClient) {}
  getSubtasks(id: number): Observable<Subtask[]> {
    return this.httpClient.get<Subtask[]>(
      'http://localhost:3000/subtasks?todoId_like=' +
        id +
        '&_sort=done&_order=asc'
    );
  }
  putSubtask(id: number, subtask: Subtask): Observable<Subtask> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<Subtask>(
      'http://localhost:3000/subtasks/' + id,
      subtask,
      { headers: headers }
    );
  }
  postSubtask(subtask: Subtask): Observable<Subtask> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Subtask>(
      'http://localhost:3000/subtasks',
      subtask,
      { headers: headers }
    );
  }
  deleteSubtask(id: number): Observable<Subtask> {
    return this.httpClient.delete<Subtask>(
      'http://localhost:3000/subtasks/' + id
    );
  }
}
