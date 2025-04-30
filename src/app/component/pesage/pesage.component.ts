import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { LimiteComponent } from '../../dialog/limite/limite.component';

@Component({
  selector: 'app-pesage',
  imports: [
    MatButtonModule,
    FormsModule,
    NgClass
  ],
  templateUrl: './pesage.component.html',
  styleUrl: './pesage.component.css'
})
export class PesageComponent implements OnInit {
  constructor(
    private dialog: MatDialog
  ) { }
  listePoids: ({ id: number, poid: number, depot: string })[] = [];
  poids: number = 0;
  depot: string = "gamo";
  number: number = 1;
  totalGamo: number = 0;
  totalMrrn: number = 0;
  totalTmtv: number = 0;
  totalPese: number = 0;
  isGamo = false;
  isMorarano = false;
  isTamatave = false;
  @Input() qteNafarana !: number;
  @Input() qteGamo !: number;
  @Input() qteMorarano !: number;
  @Input() qteTamatave !: number;
  isDepasseGamo: boolean = false;
  isDepasseMrrn: boolean = false;
  isDepasseTmtv: boolean = false;
  ngOnInit(): void {
    this.listePoids.push({
      id: 0,
      poid: 0,
      depot: ""
    })
    console.log(this.qteTamatave);
  }

  regPoid() {
    if (this.poids) {
      this.listePoids.push({
        id: this.number++,
        poid: this.poids,
        depot: this.depot
      })
      this.totalGamo = this.calculePoid("gamo");
      this.totalMrrn = this.calculePoid("morarano")
      this.totalTmtv = this.calculePoid("tamatave")
      console.log(this.totalTmtv);
      if (this.isDepasseGamo === false && this.totalGamo > this.qteGamo) {
        let dialogRef = this.dialog.open(LimiteComponent, {
          data: {
            depot: "Gamo"
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log(result);
            this.changeDepot("gamo", result[1]);
          }
        })
        this.isDepasseGamo = true;
        this.isGamo = true;
      }
      if (this.isDepasseMrrn === false && this.totalMrrn > this.qteMorarano) {
        let dialogRef = this.dialog.open(LimiteComponent, {
          data: {
            depot: "Morarano"
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log(result);
            this.changeDepot("morarano", result[1]);
          }
        })
        this.isDepasseMrrn = true;
        this.isMorarano = true;
      }
      if (this.isDepasseTmtv === false && this.totalTmtv > this.qteTamatave) {
        let dialogRef = this.dialog.open(LimiteComponent, {
          data: {
            depot: "Tamatave"
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log(result);
            this.changeDepot("tamatave", result[1]);
          }
        })
        this.isDepasseTmtv = true;
        this.isTamatave = true;
      }
      //tamatave
      this.totalPese = this.totalGamo + this.totalMrrn + this.totalTmtv;
    }

  }

  //calule de poid gamo
  calculePoid(depot: string) {
    let result: number = 0;
    this.listePoids.filter(element => element.depot == depot).forEach(vary => {
      result = result + vary.poid
    })
    return result;
  }

  changeDepot(depotInitiale: string, depotFinale: string) {
    let totalInitiale: number = 0;
    if (depotInitiale == "gamo") totalInitiale = this.totalGamo; else if (depotInitiale == "morarano") totalInitiale = this.totalMrrn; else totalInitiale = this.totalTmtv
    //last dans la liste
    console.log(this.listePoids[this.listePoids.length - 1]);
    let poidToFinale = this.listePoids[this.listePoids.length - 1].poid;
    console.log("totalInit" + totalInitiale);
    if (depotInitiale == "gamo") {
      this.listePoids[this.listePoids.length - 1].poid = this.listePoids[this.listePoids.length - 1].poid + (this.qteGamo - totalInitiale);
    } else if (depotInitiale == "morarano") {
      this.listePoids[this.listePoids.length - 1].poid = this.listePoids[this.listePoids.length - 1].poid + (this.qteMorarano - totalInitiale);
    } else {
      this.listePoids[this.listePoids.length - 1].poid = this.listePoids[this.listePoids.length - 1].poid + (this.qteTamatave - totalInitiale);
    }
    poidToFinale = poidToFinale - this.listePoids[this.listePoids.length - 1].poid;
    // //ajout du reste dans le depot finale
    this.listePoids.push({
      id: this.number,
      poid: poidToFinale,
      depot: depotFinale.toLowerCase()
    })

    console.log(this.listePoids)
    this.totalGamo = this.calculePoid("gamo");
    this.totalMrrn = this.calculePoid("morarano");
    console.log(this.totalMrrn);
    this.totalTmtv = this.calculePoid("tamatave");
    console.log(this.totalTmtv)
    this.depot = depotFinale.toLowerCase();
  }

  done() {
    let result = false;
    if (this.qteNafarana <= this.totalPese) {
      result = true;
    }
    return result;
  }

  isGamoDone(): boolean {
    let result = false;
    if (this.qteGamo <= this.totalGamo) {
      result = true;
    }
    return result;
  }
  isMrrnDone() {
    let result = false;
    if (this.qteMorarano <= this.totalMrrn) {
      result = true;
    }
    return result;
  }
  isTmtvDone() {
    let result = false;
    if (this.qteTamatave <= this.totalTmtv) {
      result = true;
    }
    return result
  }

}
