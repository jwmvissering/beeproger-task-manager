import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from './overview/overview.component';
import {LayoutContainerComponent} from './layout-container/layout-container.component';
import {NoItemsNotificationComponent} from './no-items-notification/no-items-notification.component';
import {ItemDetailsComponent} from './item-details/item-details.component';
import {EditTodoItemComponent} from './edit-todo-item/edit-todo-item.component';

const routes: Routes = [
  {
    path: '', component: LayoutContainerComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'overview'},
      {
        path: 'overview', component: OverviewComponent, children: [
          {path: '', pathMatch: 'full', component: NoItemsNotificationComponent},
          {path: 'add', component: EditTodoItemComponent},
          {
            path: ':id', children: [
              {path: '', pathMatch: 'full', component: ItemDetailsComponent},
              {path: 'edit', component: EditTodoItemComponent}
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
