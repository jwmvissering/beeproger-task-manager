import {Component, OnInit} from '@angular/core';
import {TodoItemModel} from '../shared/models/todo-item.model';
import {TodoItemsService} from '../shared/services/todo-items.service';

@Component({
  selector: 'app-no-items-notification',
  templateUrl: './no-items-notification.component.html',
  styleUrls: ['./no-items-notification.component.scss']
})
export class NoItemsNotificationComponent implements OnInit {
  todoItems: TodoItemModel[];

  constructor(private todoItemsService: TodoItemsService) {
  }

  ngOnInit(): void {
    this.getTodoItems();
  }

  getTodoItems() {
    this.todoItemsService.getTodoItems().subscribe(items => {
      this.todoItems = items;
    })
  }
}
