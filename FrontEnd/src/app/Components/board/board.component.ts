import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CardCollectionsService, CardCollection } from '../../Services/card-collections.service';
import { BoardsService, Board } from '../../Services/boards.service';
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  loading = true;
  collectionData: Array<CardCollection>;
  collectionTitle: string;
  boardId: number

  constructor(private cardCollectionsService: CardCollectionsService, public snackBar: MatSnackBar, private route: ActivatedRoute,
    private boardsService: BoardsService) {
    this.route.params.subscribe( params => {
      this.boardId = params.id;
      console.log(this.boardId);
    } );

    boardsService.getSingle(this.boardId).subscribe((data: Board) => {
      this.collectionData = data.cardCollections;
      console.log(this.collectionData);
      this.loading = false;
    });
  }

  addCollection() {
    this.cardCollectionsService.add(new CardCollection(this.collectionTitle, this.boardId, [])).subscribe((data: any) => {
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
    });
    this.collectionTitle = '';

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close');
  }

  ngOnInit() {
  }

}
