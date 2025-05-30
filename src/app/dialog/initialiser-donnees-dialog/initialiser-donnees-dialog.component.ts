import { Component, ElementRef } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { FormsModule } from '@angular/forms';
import { isEmpty } from 'rxjs';


@Component({
  selector: 'app-initialiser-donnees-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './initialiser-donnees-dialog.component.html',
  styleUrl: './initialiser-donnees-dialog.component.css'
})
export class InitialiserDonneesDialogComponent {
  //

  constructor(
    private dialogRef: MatDialogRef<InitialiserDonneesDialogComponent>,
  ) { }
  nafarana: number = 0;
  gamo: number = 0;
  morarano: number = 0;
  tamatave: number = 0;
  totalMorarano: number = 0;
  //stocker l'ensemble des donn"es dans un tableau
  dataInit: ({ nafarana: number, gamo: number, morarano: number, tamatave: number })[] = [];

  nafaranaChanged(nafarana: number) {
    if (nafarana < 0) {
      this.nafarana = 0;
    }
  }

  gamoChanged(gamoValue: number) {
    this.totalMorarano = gamoValue - this.nafarana;
    if (this.totalMorarano > this.nafarana || gamoValue > this.nafarana) {
      this.totalMorarano = 0;
      this.gamo = 0;
    }
    if (this.totalMorarano < 0) {
      this.totalMorarano = this.totalMorarano * -1;
    }
    if (gamoValue < 0) {
      this.gamo = 0;
    }

  }
  mrrnTotalChanged(mrrnValue: number) {
    this.gamo = mrrnValue - this.nafarana
    if (this.gamo > this.nafarana || mrrnValue > this.nafarana) {
      this.gamo = 0;
      this.totalMorarano = 0;
    }
    if (this.gamo < 0) {
      this.gamo = this.gamo * -1;
    }
    if (mrrnValue < 0) {
      this.totalMorarano = 0;
    }
  }
  tmtvChanged(tamValue) {
    this.morarano = tamValue - this.totalMorarano
    if (this.morarano > this.totalMorarano || tamValue > this.totalMorarano) {
      this.morarano = 0;
      this.tamatave = 0;
    }
    if (this.morarano < 0) {
      this.morarano = this.morarano * -1;
    }
    if (tamValue < 0) {
      this.morarano = 0;
    }
  }

  mrrnChanged(mrrnValue) {
    this.tamatave = mrrnValue - this.totalMorarano
    if (this.tamatave > this.totalMorarano || mrrnValue > this.totalMorarano) {
      this.tamatave = 0;
      this.morarano = 0;
    }
    if (this.tamatave < 0) {
      this.tamatave = this.tamatave * -1;
    }
    if (mrrnValue < 0) {
      this.tamatave = 0;
    }
  }

  dataReady() {
    //if (
     // this.nafarana != 0 &&
     // this.gamo != 0 &&
     // this.totalMorarano != 0 && this.nafarana && this.gamo && this.totalMorarano
    //) {
      //envoyer les données vers ler pple
      // this.dataInit.push({
      //   nafarana: this.nafarana,
      //   gamo: this.gamo,
      //   morarano: this.morarano,
      //   tamatave: this.tamatave
      // })

      this.dataInit = [{
        nafarana: this.nafarana,
        gamo: this.gamo,
        morarano: this.morarano,
        tamatave: this.tamatave
      }];
      this.dialogRef.close(this.dataInit);
      // alert(this.nafarana + "\n" + this.gamo + "\n" + this.morarano)
    //} else {
      //console.log("Veuillez tous remplir svp !!")
    //}
  }



  fermer() {
    this.dialogRef.close(false);
  }

  reset() {
    this.nafarana = 0;
    this.gamo = 0;
    this.totalMorarano = 0;
  }
}
