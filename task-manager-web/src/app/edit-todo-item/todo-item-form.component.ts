import {Component} from '@angular/core';
import {TodoItemModel} from '../shared/models/todo-item.model';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoItemsService} from '../shared/services/todo-items.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-todo-item-form',
  templateUrl: './todo-item-form.component.html',
  styleUrls: ['./todo-item-form.component.scss']
})
export class TodoItemFormComponent {
  todoItem: TodoItemModel;
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
        this.todoItem = item;
        this.createForm(item);
      } else {
        console.error('Todo item not found');
        this.router.navigate(['..']).catch();
      }
    })
  }

  private createForm(item?: TodoItemModel): void {
    this.form = this.fb.group({
      title: this.fb.control(item ? item.title : '', [Validators.required]),
      description: this.fb.control([item ? item.description : '']),
    })
  }

  submitForm(): void {
    if (this.todoItem) {
      this.updateTodoItem();
    } else {
      this.createTodoItem();
    }
  }

  private createTodoItem(): void {
    const formData = this.getFormData();
    this.todoItemsService.createTodoItem(formData).subscribe({
      next: (item: TodoItemModel) => {
        this.handleSuccess(item);
      }, error: () => {
        this.handleError();
      }
    });
  }

  private updateTodoItem(): void {
    const formData = this.getFormData();
    this.todoItemsService.updateTodoItem(this.todoItem.id, formData).subscribe({
      next: (item: TodoItemModel) => {
        this.handleSuccess(item);
      }, error: () => {
        this.handleError();
      }
    });
  }

  private getFormData(): FormData {
    const formValues = this.form.getRawValue();
    const formData = new FormData();
    formData.append('title', formValues.title || '');
    formData.append('description', formValues.description || '');
    return formData;
  }

  private handleSuccess(item: TodoItemModel): void {
    this.todoItemsService.loadTodoItems().subscribe(() => {
      this.router.navigate(['/overview/' + item.id]).catch();
    })
  }

  private handleError(): void {
  }
}
