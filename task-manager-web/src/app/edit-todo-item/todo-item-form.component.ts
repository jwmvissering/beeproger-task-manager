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
  fileData: File;
  previewUrl: any;
  fileDeleted = false;

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
      description: this.fb.control(item ? item.description : ''),
      priority: this.fb.control(item ? item.priority : '')
    })
  }

  onFileChange(fileInput: any): void {
    this.fileData = fileInput.target.files[0];
    this.createImagePreview();
  }

  createImagePreview(): void {
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
    };
  }

  deleteImage(): void {
    this.fileData = null;
    this.previewUrl = null;
    this.todoItem.image = null; // todo: dont do this
    this.fileDeleted = true;
  }

  submitForm(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
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
    formData.append('priority', formValues.priority || '');
    if (this.fileData) {
      formData.append('image', this.fileData);
    } else if (this.fileDeleted) {
      formData.append('image', '');
    }

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
