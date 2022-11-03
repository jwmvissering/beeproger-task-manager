import {Component, OnInit} from '@angular/core';
import {TodoItemsService} from '../shared/services/todo-items.service';
import {TodoItemModel} from '../shared/models/todo-item.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
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
