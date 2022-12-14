import {Component, Input} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {TodoItemModel} from '../../shared/models/todo-item.model';
import {TodoItemsService} from '../../shared/services/todo-items.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-overview-list',
  templateUrl: './overview-list.component.html',
  styleUrls: ['./overview-list.component.scss']
})
export class OverviewListComponent {
  @Input() todoItems: TodoItemModel[];

  constructor(private todoItemsService: TodoItemsService, private router: Router, private route: ActivatedRoute) {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todoItems, event.previousIndex, event.currentIndex);
    this.todoItemsService.saveItemOrder(this.todoItems.map(item => item.id)).subscribe();
  }

  toggleTodoItem(todoItem: TodoItemModel) {
    this.todoItemsService.toggleTodoItem(todoItem).subscribe(item => {
      Object.assign(todoItem, item);
    });
  }

  itemIsActive(id: string) {
    return this.route.firstChild.snapshot.params['id'] == id;
  }
}
