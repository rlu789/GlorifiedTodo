import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Board, BoardsService } from '../../Services/boards.service';
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = true;
  boardData: Array<Board>;
  boardTitle: string;


  constructor(private boardsService: BoardsService, public snackBar: MatSnackBar, private router: Router) {
    boardsService.get().subscribe((data: Array<Board>) => {
      this.boardData = data;
      console.log(this.boardData);
      this.loading = false;
    });
  }

  viewBoard(i: number){
    this.router.navigate(['board', this.boardData[i].id]); 
  }

  deleteBoard(i: number){
    this.boardsService.remove(this.boardData[i]).subscribe((data: any) => {
      this.boardData.splice(i, 1);
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

  addBoard(){
    var board = new Board(this.boardTitle);
    this.boardTitle = '';
    this.boardsService.add(board).subscribe((data: any) => {
      this.boardData.push(data);
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
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close');
  }

  ngOnInit() {
  }

}
