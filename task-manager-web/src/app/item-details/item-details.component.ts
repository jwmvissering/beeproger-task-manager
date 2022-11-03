import {Component, OnInit} from '@angular/core';
import {TodoItemsService} from '../shared/services/todo-items.service';
import {ActivatedRoute} from '@angular/router';
import {TodoItemModel} from '../shared/models/todo-item.model';
import {MatDialog} from '@angular/material/dialog';
import {GenericModalComponent} from '../shared/components/generic-modal/generic-modal.component';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  todoItem: TodoItemModel;

  constructor(private route: ActivatedRoute, private todoItemsService: TodoItemsService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.getTodoItem(params['id']);
      }
    })
  }

  getTodoItem(id) {
    this.todoItemsService.getTodoItem(id).subscribe(item => {
      this.todoItem = item;
    })
  }

  toggleTodoItem(todoItem: TodoItemModel) {
    this.todoItemsService.toggleTodoItem(todoItem);
  }

  deleteTodoItem() {
    const dialogRef = this.dialog.open(GenericModalComponent, {
      data: {
        title: 'Weet je zeker dat je deze taak wilt verwijderen?',
        cancelButtonText: 'Annuleren',
        showContinueButton: true,
        continueButtonText: 'Verwijderen'
      },
      width: '350px',
      maxWidth: '90vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // todo: delete
      }
    });
  }
}
