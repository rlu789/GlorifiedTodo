import { Component, OnInit, Input } from '@angular/core';
import { CardCollectionsService, CardCollection } from '../../Services/card-collections.service';
import { CardsService, Card } from '../../Services/cards.service';
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-card-collection',
  templateUrl: './card-collection.component.html',
  styleUrls: ['./card-collection.component.css']
})
export class CardCollectionComponent implements OnInit {
  @Input('collectionData') collectionData: Array<CardCollection>;

  cardTitle: string;
  cardDesc: string;

  constructor(private cardsService: CardsService, private cardCollectionsService: CardCollectionsService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  deleteCol(i: number){
    this.cardCollectionsService.remove(this.collectionData[i]).subscribe((data: any) => {
      console.log(data);
      this.collectionData.splice(i, 1);
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
    });
  }

  deleteCard(collectionIndex: number, cardIndex: number){
    var cardToBeDeleted = this.collectionData[collectionIndex].cards[cardIndex];
    console.log(cardToBeDeleted);
    this.collectionData[collectionIndex].cards.splice(cardIndex, 1);
    this.cardsService.remove(cardToBeDeleted).subscribe((data: any) => {
      console.log(data);
    })
  }

  addCard(i:number, id: number){
    var c = new Card(this.cardTitle, this.cardDesc, id);
    this.cardDesc = '';
    this.cardTitle = '';
    if (!this.collectionData[i].cards) this.collectionData[i].cards = [];
    this.cardsService.add(c).subscribe((data: Card) => {
      console.log(data);
      this.collectionData[i].cards.push(data);
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
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close');
  }
}
