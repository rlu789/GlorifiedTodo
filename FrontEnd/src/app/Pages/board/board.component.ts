import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CardCollectionsService, CardCollection } from '../../Services/card-collections.service';
import { BoardsService, Board } from '../../Services/boards.service';
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { EditBoardModalComponent } from '../../Modals/edit-board-modal/edit-board-modal.component';
import * as XLSX from 'xlsx';
import { Constants } from '../../Custom/Base';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  loading = true;
  boardId: number;
  board: Board;

  editable: boolean;
  password: string;

  collectionTitle: string;
  collectionColor: string;
  boardColors: { text: string, value: number | string }[] = Constants.boardColors;

  constructor(private cardCollectionsService: CardCollectionsService, public snackBar: MatSnackBar, private route: ActivatedRoute,
    private boardsService: BoardsService, public dialog: MatDialog) {
    this.route.params.subscribe(params => {
      this.boardId = params.id;
    });

    boardsService.getSingle(this.boardId).subscribe((data: Board) => {
      this.board = data;
      this.editable = data.password === "Y" ? false : true;
      this.loading = false;
    });
  }

  editBoard() {
    const dialogRef = this.dialog.open(EditBoardModalComponent, {
      width: '500px',
      data: { board: this.board, password: this.password }
    });

    dialogRef.afterClosed().subscribe((data: { board: Board, password: string } | undefined) => {
      if (data) {
        this.board.title = data.board.title;
        if (data.password) this.password = data.password;
      }
    });
  }

  addCollection($event) {
    this.cardCollectionsService.add(new CardCollection(this.collectionTitle, this.boardId, this.collectionColor), this.password).subscribe((data: any) => {
      this.board.cardCollection.push(data);
      $event.complete();
      // console.log(data);
    }, (err: HttpErrorResponse) => {
      $event.complete();
    });
    this.collectionTitle = '';
  }

  unlock($event) {
    this.boardsService.authorize(this.boardId, this.password).subscribe((data: any) => {
      this.editable = true;
      this.openSnackBar("Unlocked for edit");
      $event.complete();
    }, (err: HttpErrorResponse) => {
      $event.complete();
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', { duration: 1500 });
  }

  exportToExcel($event) {
    var b = this.board;
    console.log(b);

    var ws = XLSX.utils.aoa_to_sheet([[b.title]]);
    var col = 0;
    var row = 1;
    b.cardCollection.forEach(collection => {
      XLSX.utils.sheet_add_aoa(ws, [[collection.title]], { origin: { r: row, c: col } });
      var cardCells = [];
      collection.card.forEach((card) => {
        cardCells.push([card.title, card.description]);
      });
      XLSX.utils.sheet_add_aoa(ws, cardCells, { origin: { r: row + 1, c: col } });
      col += 2;
    });

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'test.xlsx');

    $event.complete();
  }

  ngOnInit() {
  }

}
