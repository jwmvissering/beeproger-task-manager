import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-check-todo-item-button',
  templateUrl: './check-todo-item-button.component.html',
  styleUrls: ['./check-todo-item-button.component.scss']
})
export class CheckTodoItemButtonComponent {
  @Input() completed = false;
  @Input() size = 22;
  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();
  hovering = false;

  get getImageClass(): string {
    if (this.hovering && !this.completed) {
      return 'fa-solid fa-circle text-success';
    }
    return this.completed ? 'fa-solid fa-circle-check text-success' : 'fa-regular fa-circle';
  }
}
