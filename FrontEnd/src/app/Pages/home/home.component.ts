import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Board, BoardsService } from '../../Services/boards.service';
import { HttpErrorResponse } from "@angular/common/http";
import { ConfirmModalComponent } from '../../Modals/confirm-modal/confirm-modal.component';
import { CustomValidators, CustomFormControl } from '../../Custom/Base';

import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = true;
  boardData: Array<Board>;
  boardTitle: string;
  boardPassword = new CustomFormControl('');
  boardPasswordRepeat = new CustomFormControl('', [CustomValidators.matchValidator(this.boardPassword)]);
  boardPasswordRepeatFocus = false;

  constructor(private boardsService: BoardsService, public snackBar: MatSnackBar, private router: Router,
    public dialog: MatDialog) {
    boardsService.get().subscribe((data: Array<Board>) => {
      this.boardData = data;
      // console.log(this.boardData);
      this.loading = false;
    });
    this.boardPassword.valueChanges.subscribe((value: string) => {
      if (!value) this.boardPasswordRepeat.reset();
    });
  }

  viewBoard(i: number) {
    this.router.navigate(['board', this.boardData[i].id]);
  }

  deleteBoard(i: number) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '500px',
      data: { password: this.boardData[i].password },
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.boardsService.remove(this.boardData[i], result.password).subscribe((data: any) => {
          this.boardData.splice(i, 1);
        });
      }
    });
  }

  addBoard($event) {
    this.boardPasswordRepeat.updateValueAndValidity();
    this.boardPasswordRepeat.markAsDirty();
    this.boardPasswordRepeat.markAsTouched();
    if (this.boardPasswordRepeat.valid) {
      var board = new Board(this.boardTitle);

      if (this.boardPassword.value) {
        board.password = this.boardPassword.value;
      }
      this.boardsService.add(board).subscribe((data: any) => {
        this.boardTitle = '';
        this.boardPassword.setValue('');
        this.boardData.push(data);
        $event.complete();
        // console.log(data);
      }, (err: HttpErrorResponse) => {
        $event.complete();
      });
    }
    else {
      this.boardPasswordRepeat.hasFocus = true;
      $event.complete();
    }
  }

  // onFileChanged(event) {
  //   var self = this;
  //   const blob = new Blob([event.target.files[0]], { type: "image/png" });
    
  //   var r = new FileReader();
  //   r.onload = function () {
  //     console.log(r.result);
  //     // document.querySelector('img').src = r.result as string;
  //     var i = new Image(r.result as string, 1);
  //     self.imagesService.add(i).subscribe((data: any) => {
  //       console.log(data);
  //     });
  //   };
  //   r.readAsDataURL(blob);

  //   // console.log(blob);

  //   // const imageUrl = URL.createObjectURL(blob);
  //   // const img = document.querySelector('img');
  //   // img.addEventListener('load', () => URL.revokeObjectURL(imageUrl));
  //   // document.querySelector('img').src = imageUrl;
  // }

  ngOnInit() {
  }

}
