import { Component, OnInit, Input } from '@angular/core';
import { CardCollectionsService, CardCollection } from '../../Services/card-collections.service';
import { CardsService, Card } from '../../Services/cards.service';

@Component({
  selector: 'app-card-collection',
  templateUrl: './card-collection.component.html',
  styleUrls: ['./card-collection.component.css']
})
export class CardCollectionComponent implements OnInit {
  @Input('collection') collection: CardCollection;

  cardTitle: string;
  cardDesc: string;

  constructor(private cardsService: CardsService, private cardCollectionsService: CardCollectionsService) { }

  ngOnInit() {
  }

  addCard(id){
    var c = new Card(this.cardTitle, this.cardDesc, id);
    this.cardDesc = '';
    this.cardTitle = '';
    if (!this.collection.cards) this.collection.cards = [];
    this.collection.cards.push(c);
    this.cardCollectionsService.update(this.collection).subscribe((data: any) => {
      console.log(data);
    });
  }
}
