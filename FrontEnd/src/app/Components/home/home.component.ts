import { Component, OnInit } from '@angular/core';
import { CardCollectionsService, CardCollection } from '../../Services/card-collections.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  collectionData: Array<CardCollection>;
  collectionTitle: string;

  constructor(private cardCollectionsService: CardCollectionsService) {
    cardCollectionsService.get().subscribe((data: Array<CardCollection>) => {
      this.collectionData = data;
      console.log(this.collectionData);
    });
  }

  addCollection(){
    this.cardCollectionsService.add(new CardCollection(this.collectionTitle, [])).subscribe((data: any) => {
      this.collectionData.push(data);
      console.log(data);
    });
    
  }

  ngOnInit() {
  }

}
