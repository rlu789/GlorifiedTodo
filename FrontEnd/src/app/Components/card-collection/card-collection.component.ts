import { Component, OnInit, Input } from '@angular/core';
import { CardsService, Card } from '../../Services/cards.service';

@Component({
  selector: 'app-card-collection',
  templateUrl: './card-collection.component.html',
  styleUrls: ['./card-collection.component.css']
})
export class CardCollectionComponent implements OnInit {
  @Input('collection') collection: Object;

  cardTitle: string;
  cardDesc: string;

  constructor(private cardsService: CardsService) { }

  ngOnInit() {
  }

  addCard(id){
    var c = new Card(this.cardTitle, this.cardDesc, id);
    console.log(c);
    this.cardsService.add(c).subscribe((data: any) => {
      this.collection['cards'].push(data);
      console.log(data);
    });
  }
}
