import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {TranslateModule} from "@ngx-translate/core";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [MatDialogModule, TranslateModule,NgIf],
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}

  onCancel() {
    this.dialogRef.close(false);
  }

  onAccept() {
    this.dialogRef.close(true);
  }

}
