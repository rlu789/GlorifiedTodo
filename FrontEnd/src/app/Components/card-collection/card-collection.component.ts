import { Component, OnInit, Input } from '@angular/core';
import { CardCollectionsService, CardCollection } from '../../Services/card-collections.service';
import { CardsService, Card } from '../../Services/cards.service';

@Component({
  selector: 'app-card-collection',
  templateUrl: './card-collection.component.html',
  styleUrls: ['./card-collection.component.css']
})
export class CardCollectionComponent implements OnInit {
  @Input('collectionData') collectionData: Array<CardCollection>;

  cardTitle: string;
  cardDesc: string;

  constructor(private cardsService: CardsService, private cardCollectionsService: CardCollectionsService) { }

  ngOnInit() {
  }

  addCard(i:number, id: number){
    var c = new Card(this.cardTitle, this.cardDesc, id);
    this.cardDesc = '';
    this.cardTitle = '';
    if (!this.collectionData[i].cards) this.collectionData[i].cards = [];
    this.collectionData[i].cards.push(c);
    this.cardCollectionsService.update(this.collectionData[i]).subscribe((data: any) => {
      console.log(data);
    });
  }
}
