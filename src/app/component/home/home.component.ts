import { Component, OnInit } from '@angular/core';
import { MainComponent } from "../main/main.component";
import { MatDialog } from '@angular/material/dialog';
import { InitialiserDonneesDialogComponent } from '../../dialog/initialiser-donnees-dialog/initialiser-donnees-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { PesageComponent } from "../pesage/pesage.component";

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    PesageComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(
    private dialog: MatDialog
  ) { }
  nafarana: number = 0;
  gamo: number = 0;
  morarano: number = 0;
  tamatave: number = 0;
  isPesageCliked: boolean = false;
  ngOnInit(): void {
    this.openInitializing()
  }
  openInitializing() {
    const dialogRef = this.dialog.open(InitialiserDonneesDialogComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.nafarana = result[0].nafarana;
        this.gamo = result[0].gamo;
        this.morarano = result[0].morarano;
        this.tamatave = result[0].tamatave;
      }
    })
  }

  pesageCliked() {
    this.isPesageCliked = true;
    console.log(this.isPesageCliked)
  }


}
