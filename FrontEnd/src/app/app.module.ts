import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { CardCollectionsService } from './Services/card-collections.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent }
 
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    CardCollectionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
