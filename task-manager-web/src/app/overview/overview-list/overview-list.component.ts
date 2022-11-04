import {Component, Input} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {TodoItemModel} from '../../shared/models/todo-item.model';
import {TodoItemsService} from '../../shared/services/todo-items.service';

@Component({
  selector: 'app-overview-list',
  templateUrl: './overview-list.component.html',
  styleUrls: ['./overview-list.component.scss']
})
export class OverviewListComponent {
  @Input() todoItems: TodoItemModel[];

  constructor(private todoItemsService: TodoItemsService) {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todoItems, event.previousIndex, event.currentIndex);
  }

  toggleTodoItem(todoItem: TodoItemModel) {
    this.todoItemsService.toggleTodoItem(todoItem).subscribe(item => {
      Object.assign(todoItem, item);
    });
  }
}
