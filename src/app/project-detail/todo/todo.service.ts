import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subtask } from './subtask';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private httpClient: HttpClient) {}
  getTodos(id: number): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(
      'http://localhost:3000/todos?projectId_like=' + id
    );
  }
  postTodo(todo: Todo): Observable<Todo> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Todo>('http://localhost:3000/todos', todo, {
      headers: headers,
    });
  }
  putTodo(todo: Todo, id: number): Observable<Todo> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<Todo>(
      'http://localhost:3000/todos/' + id,
      todo,
      { headers: headers }
    );
  }
}
