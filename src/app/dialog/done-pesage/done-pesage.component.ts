import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-done-pesage',
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './done-pesage.component.html',
  styleUrl: './done-pesage.component.css'
})
export class DonePesageComponent {
  constructor(
    private dialogRef: MatDialogRef<DonePesageComponent>
  ) { }
  close() {
    this.dialogRef.close(false);
  }

  ok() {
    this.dialogRef.close(true);
  }

}
