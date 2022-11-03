import {Component} from '@angular/core';
import {TodoItemModel} from '../shared/models/todo-item.model';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoItemsService} from '../shared/services/todo-items.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-todo-item',
  templateUrl: './edit-todo-item.component.html',
  styleUrls: ['./edit-todo-item.component.scss']
})
export class EditTodoItemComponent {
  form: FormGroup;

  constructor(private route: ActivatedRoute, private todoItemsService: TodoItemsService, private fb: FormBuilder, private router: Router) {
    if (this.route.snapshot.params['id']) {
      this.getTodoItem(this.route.snapshot.params['id']);
    } else {
      this.createForm();
    }
  }

  private getTodoItem(id): void {
    this.todoItemsService.getTodoItem(id).subscribe(item => {
      if (item) {
        this.createForm(item);
      } else {
        console.error('Todo item not found');
        this.router.navigate(['..']).catch();
      }
    })
  }

  private createForm(item?: TodoItemModel): void {
    this.form = this.fb.group({
      title: this.fb.control([item ? item.title : '']),
      description: this.fb.control([item ? item.description : '']),
    })
  }
}
