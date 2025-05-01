import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update',
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  id: number = 0;
  list: ({ id: number, poid: number, depot: string })[] = [];
  newPoid: number = 0;
  newDepot: string = "gamo";
  oldPoid: ({ id: number, poid: number, depot: string })[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<UpdateComponent>
  ) {
    this.id = data.id
    this.list = data.liste
    console.log(this.list);
    this.oldPoid = this.list.filter(element => element.id == this.id);
    console.log(this.oldPoid);
    this.newPoid = this.oldPoid[0].poid;
    this.newDepot = this.oldPoid[0].depot;
  }

  ok() {
    this.dialogRef.close([this.newPoid, this.newDepot]);
  }

  cancel() {
    this.dialogRef.close(false);
  }

}
