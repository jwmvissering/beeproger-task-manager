import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from './overview/overview.component';
import {LayoutContainerComponent} from './layout-container/layout-container.component';
import {NoItemsNotificationComponent} from './no-items-notification/no-items-notification.component';
import {ItemDetailsComponent} from './item-details/item-details.component';
import {TodoItemFormComponent} from './edit-todo-item/todo-item-form.component';

const routes: Routes = [
  {
    path: '', component: LayoutContainerComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'overview'},
      {
        path: 'overview', component: OverviewComponent, children: [
          {path: '', pathMatch: 'full', component: NoItemsNotificationComponent},
          {path: 'add', component: TodoItemFormComponent},
          {
            path: ':id', children: [
              {path: '', pathMatch: 'full', component: ItemDetailsComponent},
              {path: 'edit', component: TodoItemFormComponent}
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
