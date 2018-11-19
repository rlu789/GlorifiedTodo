import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatProgressSpinnerModule, 
  MatSnackBarModule, MatExpansionModule, MatDialogModule } from '@angular/material';

import { CardCollectionsService } from './Services/card-collections.service';
import { CardsService } from './Services/cards.service';
import { BoardsService } from './Services/boards.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { CardCollectionComponent } from './Components/card-collection/card-collection.component';
import { BoardComponent } from './Pages/board/board.component';
import { ConfirmModalComponent } from './Modals/confirm-modal/confirm-modal.component';
import { ClickStopPropagationDirective } from './Directives/click-stop-propagation.directive';
import { EditCardModalComponent } from './Modals/edit-card-modal/edit-card-modal.component';
import { CustomButtonComponent } from './Custom/custom-button/custom-button.component';

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
    EditCardModalComponent,
    CustomButtonComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    HttpClientModule,
    FormsModule,
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
    CardCollectionsService,
    CardsService,
    BoardsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmModalComponent,
    EditCardModalComponent
  ],
})
export class AppModule { }
