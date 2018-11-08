import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';

import { CardCollectionsService } from './Services/card-collections.service';
import { CardsService } from './Services/cards.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { CardCollectionComponent } from './Components/card-collection/card-collection.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent }
 
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardCollectionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [
    CardCollectionsService,
    CardsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
