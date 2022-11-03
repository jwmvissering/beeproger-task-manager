import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, of, tap} from 'rxjs';
import {TodoItemModel} from '../models/todo-item.model';
import {RequestObject} from '../models/request-object.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {
  entityPath = 'todoItems';
  todoItems: TodoItemModel[] = [];

  constructor(private http: HttpClient) {
  }

  getTodoItems(): Observable<TodoItemModel[]> {
    return this.http.get<RequestObject<TodoItemModel[]>>(environment.apiUrl + this.entityPath)
      .pipe(
        map((data: RequestObject<TodoItemModel[]>) => data.data),
        map((data: TodoItemModel[]) => data.map(todoItem => new TodoItemModel(todoItem))),
        tap((data: TodoItemModel[]) => this.todoItems = data)
      );
  }

  getTodoItem(id: string): Observable<TodoItemModel> {
    const todoItem = this.todoItems.find((item) => item.id == id);
    return of(todoItem);
  }

  toggleTodoItem(todoItem): void {
    todoItem.completed = !todoItem.completed;
  }
}
