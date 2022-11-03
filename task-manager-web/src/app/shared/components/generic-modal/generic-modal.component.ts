import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss']
})
export class GenericModalComponent {
  title: string;
  description: string;
  continueButtonText: string;
  cancelButtonText: string;
  showCancelButton: boolean;
  showContinueButton: boolean;

  constructor(public dialogRef: MatDialogRef<GenericModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.description = data.description;
    this.continueButtonText = data.continueButtonText || 'Doorgaan';
    this.cancelButtonText = data.cancelButtonText || 'Annuleren';
    this.showCancelButton = typeof data.showCancelButton === 'boolean' ? data.showCancelButton : true;
    this.showContinueButton = typeof data.showContinueButton === 'boolean' ? data.showContinueButton : true;
  }
}
