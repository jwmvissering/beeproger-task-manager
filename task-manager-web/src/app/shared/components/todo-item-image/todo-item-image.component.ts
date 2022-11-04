import {Component, Input} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-todo-item-image',
  templateUrl: './todo-item-image.component.html',
  styleUrls: ['./todo-item-image.component.scss']
})
export class TodoItemImageComponent {
  @Input() imagePath: string;
  @Input() previewImage: string;
  @Input() alt: string;
  apiPath = environment.backendUrl;
}
