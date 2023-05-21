import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {TranslateModule} from "@ngx-translate/core";


@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [MatDialogModule, TranslateModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    console.log(data);
  }

}
