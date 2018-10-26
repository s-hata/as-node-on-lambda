import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { List } from 'immutable';

import { environment } from '@env/environment';
import { Todo } from '@app/shared/models/todo';


@Injectable()
export class TodosService {
  public load(): Observable<List<Todo>> {
    return this.httpClient.get(`${environment.api_base_url}/todos`).pipe(
      map(data => {
       if (data instanceof Array) {
         return List(data.map(todo => this.transform(todo)));
       } else {
         return List<Todo>();
       }
    })) as Observable<List<Todo>>;
  }

  public add(todo: Todo): Observable<Todo> {
    return this.httpClient.post(`${environment.api_base_url}/todos`, todo).pipe(
      map(data  => this.transform(data))
    ) as Observable<Todo>;
  }

  public update(todo: Todo): Observable<Todo> {
    return this.httpClient.put(`${environment.api_base_url}/todos/${todo.id}`, todo).pipe(
      map(data  => this.transform(data))
    ) as Observable<Todo>;
  }

  public remove(todo: Todo): Observable<Todo> {
    return this.httpClient.delete(`${environment.api_base_url}/todos/${todo.id}`).pipe(
      map(data  => this.transform(data))
    ) as Observable<Todo>;
  }

  constructor(private httpClient: HttpClient) { }

  private transform(todo: Object): Todo {
    return new Todo(todo);
  }
}
