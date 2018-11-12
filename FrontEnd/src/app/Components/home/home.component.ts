import { Component, OnInit } from '@angular/core';
import { CardCollectionsService, CardCollection } from '../../Services/card-collections.service';
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = true;
  collectionData: Array<CardCollection>;
  collectionTitle: string;

  constructor(private cardCollectionsService: CardCollectionsService, public snackBar: MatSnackBar) {
    cardCollectionsService.get().subscribe((data: Array<CardCollection>) => {
      this.collectionData = data;
      console.log(this.collectionData);
      this.loading = false;
    });
  }

  addCollection() {
    this.cardCollectionsService.add(new CardCollection(this.collectionTitle, [])).subscribe((data: any) => {
      this.collectionData.push(data);
      console.log(data);
    }, (err: HttpErrorResponse) => {
      var errMsg = err.statusText + ': ';
      Object.keys(err.error).forEach(function(e){
        // errMsg += ' ' + e + ": "
        err.error[e].forEach(function(str){
          errMsg += str;
        })
      })
      console.log(err);
      this.openSnackBar(errMsg);
    }
    );

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close');
  }

  ngOnInit() {
  }

}
