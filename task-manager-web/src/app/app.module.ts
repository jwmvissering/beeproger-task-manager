import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OverviewComponent} from './overview/overview.component';
import {LayoutContainerComponent} from './layout-container/layout-container.component';
import {ItemDetailsComponent} from './item-details/item-details.component';
import {NoItemsNotificationComponent} from './no-items-notification/no-items-notification.component';
import {OverviewListComponent} from './overview/overview-list/overview-list.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import {
  CheckTodoItemButtonComponent
} from './shared/components/check-todo-item-button/check-todo-item-button.component';
import {EditTodoItemComponent} from './edit-todo-item/edit-todo-item.component';
import {ReactiveFormsModule} from '@angular/forms';
import {GenericModalComponent} from './shared/components/generic-modal/generic-modal.component';
import {MatDialogModule} from '@angular/material/dialog';

registerLocaleData(localeNl);

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    LayoutContainerComponent,
    ItemDetailsComponent,
    NoItemsNotificationComponent,
    OverviewListComponent,
    CheckTodoItemButtonComponent,
    EditTodoItemComponent,
    GenericModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DragDropModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'nl'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
