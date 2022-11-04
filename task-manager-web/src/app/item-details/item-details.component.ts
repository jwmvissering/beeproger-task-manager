import {Component, OnInit} from '@angular/core';
import {TodoItemsService} from '../shared/services/todo-items.service';
import {ActivatedRoute, Router} from '@angular/router';
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

  constructor(private route: ActivatedRoute, private todoItemsService: TodoItemsService, private dialog: MatDialog, private router: Router) {
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

  toggleTodoItem() {
    this.todoItemsService.toggleTodoItem(this.todoItem).subscribe(item => {
      Object.assign(this.todoItem, item);
    });
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
        this.todoItemsService.deleteTodoItem(this.todoItem.id).subscribe(() => {
          this.todoItemsService.loadTodoItems().subscribe(() => {
            this.router.navigate(['..']).catch();
          })
        });
      }
    });
  }
}
