import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatProgressSpinnerModule, 
  MatSnackBarModule, MatExpansionModule, MatDialogModule } from '@angular/material';

import { ServiceBaseService } from './Services/service-base.service';
import { CardCollectionsService } from './Services/card-collections.service';
import { CardsService } from './Services/cards.service';
import { BoardsService } from './Services/boards.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { CardCollectionComponent } from './Components/card-collection/card-collection.component';
import { BoardComponent } from './Pages/board/board.component';
import { ConfirmModalComponent } from './Modals/confirm-modal/confirm-modal.component';
import { ClickStopPropagationDirective } from './Directives/click-stop-propagation.directive';
import { FocusDirective } from './Directives/focus.directive';
import { EditCardModalComponent } from './Modals/edit-card-modal/edit-card-modal.component';
import { CustomButtonComponent } from './Custom/custom-button/custom-button.component';
import { CustomAlertComponent } from './Custom/custom-alert/custom-alert.component';
import { CustomHeadingComponent } from './Custom/custom-heading/custom-heading.component';
import { EditBoardModalComponent } from './Modals/edit-board-modal/edit-board-modal.component';
import { CustomTextComponent } from './Custom/custom-text/custom-text.component';

const appRoutes: Routes = [
  {
    path: '', 
    component: HomeComponent,
    pathMatch: 'full'
  },
  { path: 'board/:id', component: BoardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardCollectionComponent,
    BoardComponent,
    ConfirmModalComponent,
    ClickStopPropagationDirective,
    FocusDirective,
    EditCardModalComponent,
    CustomButtonComponent,
    CustomAlertComponent,
    CustomHeadingComponent,
    EditBoardModalComponent,
    CustomTextComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDialogModule,
  ],
  providers: [
    ServiceBaseService,
    CardCollectionsService,
    CardsService,
    BoardsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmModalComponent,
    EditCardModalComponent,
    EditBoardModalComponent
  ],
})
export class AppModule { }
