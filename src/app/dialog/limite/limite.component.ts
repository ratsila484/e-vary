import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-limite',
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './limite.component.html',
  styleUrl: './limite.component.css'
})
export class LimiteComponent {
  Cedepot: string = "";
  listDepot: string[] = ["Gamo", "Morarano", "Tamatave"];
  selectDepot: string = "";
  constructor(
    private dialogRef: MatDialogRef<LimiteComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    this.Cedepot = data.depot;
  }

  ok() {
    this.dialogRef.close([true, this.selectDepot]);
  }
  non() {
    this.dialogRef.close(false);
  }
}

