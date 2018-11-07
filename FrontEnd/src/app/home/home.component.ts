import { Component, OnInit } from '@angular/core';
import { CardCollectionsService } from '../Services/card-collections.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  collectionData: Array<any>;
  collectionTitle: string;

  constructor(private cardCollectionsService: CardCollectionsService) {
    cardCollectionsService.get().subscribe((data: any) => {
      console.log(data);
    });
  }

  addCollection(){
    this.cardCollectionsService.add({
      title: this.collectionTitle
    }).subscribe((data: any) => {
      console.log(data);
    });
  }

  ngOnInit() {
  }

}
