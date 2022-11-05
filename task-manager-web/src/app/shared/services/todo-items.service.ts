import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable, of, ReplaySubject, tap} from 'rxjs';
import {TodoItemModel} from '../models/todo-item.model';
import {RequestObject} from '../models/request-object.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {
  entityPath = 'todoItems';
  cachedTodoItems: TodoItemModel[] = [];
  todoItems: ReplaySubject<TodoItemModel[]> = new ReplaySubject<TodoItemModel[]>();

  constructor(private http: HttpClient) {
  }

  getTodoItems(): Observable<TodoItemModel[]> {
    return this.todoItems;
  }

  loadTodoItems(): Observable<TodoItemModel[]> {
    return this.http.get<RequestObject<TodoItemModel[]>>(environment.apiUrl + this.entityPath)
      .pipe(
        map((data: RequestObject<TodoItemModel[]>) => data.data),
        map((data: TodoItemModel[]) => data.map(todoItem => new TodoItemModel(todoItem))),
        tap((data: TodoItemModel[]) => this.cachedTodoItems = data), // todo: remove this
        tap((data: TodoItemModel[]) => this.todoItems.next(data))
      );
  }

  getTodoItem(id: string): Observable<TodoItemModel> {
    const todoItem = this.cachedTodoItems.find((item) => item.id == id);
    return of(todoItem);
  }

  createTodoItem(data: FormData): Observable<TodoItemModel> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<RequestObject<TodoItemModel>>(environment.apiUrl + this.entityPath, data, {headers})
      .pipe(
        map((data: RequestObject<TodoItemModel>) => data.data),
        map((todoItem: any) => new TodoItemModel(todoItem))
      );
  }

  updateTodoItem(id: string, data: any): Observable<TodoItemModel> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<RequestObject<TodoItemModel>>(environment.apiUrl + this.entityPath + '/' + id, data, {
      params: {_method: 'PATCH'},
      headers
    })
      .pipe(
        map((data: RequestObject<TodoItemModel>) => data.data),
        map((todoItem: any) => new TodoItemModel(todoItem))
      );
  }

  toggleTodoItem(todoItem: TodoItemModel): Observable<TodoItemModel> {
    if (!todoItem.completed) {
      return this.markAsComplete(todoItem);
    }
    return this.markAsInComplete(todoItem);
  }

  markAsComplete(todoItem: TodoItemModel): Observable<TodoItemModel> {
    return this.http.post<RequestObject<TodoItemModel>>(environment.apiUrl + this.entityPath + '/markAsComplete/' + todoItem.id, {}, {
      params: {_method: 'PATCH'}
    })
      .pipe(
        map((data: RequestObject<TodoItemModel>) => data.data),
        map((todoItem: any) => new TodoItemModel(todoItem))
      );
  }

  markAsInComplete(todoItem: TodoItemModel): Observable<TodoItemModel> {
    return this.http.post<RequestObject<TodoItemModel>>(environment.apiUrl + this.entityPath + '/markAsIncomplete/' + todoItem.id, {}, {
      params: {_method: 'PATCH'} //todo: put of patch?
    }).pipe(
      map((data: RequestObject<TodoItemModel>) => data.data),
      map((todoItem: any) => new TodoItemModel(todoItem))
    );
  }

  saveItemOrder(ids: string[]): Observable<void> {
    return this.http.post<any>(environment.apiUrl + this.entityPath + '/saveItemOrder', {ids});
  }

  deleteTodoItem(id: string) {
    return this.http.delete<any>(environment.apiUrl + this.entityPath + '/' + id);
  }
}
