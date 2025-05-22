import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { LimiteComponent } from '../../dialog/limite/limite.component';
import { UpdateComponent } from '../../dialog/update/update.component';
import { DonePesageComponent } from '../../dialog/done-pesage/done-pesage.component';
import jsPDF from 'jspdf';
import { data } from 'jquery';

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
  poidChanged: ({
    total: { id: number, poid: number, depot: string },
    depotInitial: { id: number, poid: number, depot: string },
    depotFinal: { id: number, poid: number, depot: string }
  })[] = []
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
      if (this.totalGamo == this.qteGamo) this.isGamo = true;
      if (this.totalMrrn == this.qteMorarano) this.isMorarano = true;
      if (this.totalTmtv == this.qteTamatave) this.isTamatave = true;
      this.totalPese = this.totalGamo + this.totalMrrn + this.totalTmtv;
    }

  }

  changeColor(isDepotDepasse: boolean) {
    let result = ""
    console.log("isDepotDepasse = " + isDepotDepasse)
    if (isDepotDepasse) {
      result = "morarano"
    } else {
      result = "morarano-reset"
    }

    return result
  }

  //calule de poid gamo
  calculePoid(depot: string) {
    let result: number = 0;
    this.listePoids.filter(element => element.depot == depot).forEach(vary => {
      result = result + vary.poid
    })

    //teste si la total de la valeur pesé est superieur à la valeur initiale
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
    // else if (this.isDepasseGamo === true || this.isGamo === true) {
    //   this.isDepasseGamo = false
    //   this.isGamo = false
    // }
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
    // else if (this.isDepasseMrrn === true || this.isMorarano === true) {
    //   this.isDepasseMrrn = false
    //   this.isMorarano = false
    // }
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
    // else if (this.isDepasseTmtv === true || this.isTamatave === true) {
    //   this.isDepasseTmtv = false
    //   this.isTamatave = false
    // }
    return result;

  }

  changeDepot(depotInitiale: string, depotFinale: string) {
    let totalInitiale: number = 0;
    let lastPoid = 0;
    let lastPoid_id = 0;
    let lastPoid_depot = "";
    let initialPoid = 0
    let initialPoid_id = 0
    let initialPoid_depot = ""
    let finalPoid = 0
    let finalPoid_id = 0
    let finalPoid_depot = ""
    if (depotInitiale == "gamo") totalInitiale = this.totalGamo; else if (depotInitiale == "morarano") totalInitiale = this.totalMrrn; else totalInitiale = this.totalTmtv
    //last dans la liste
    console.log(this.listePoids[this.listePoids.length - 1]);
    let poidToFinale = this.listePoids[this.listePoids.length - 1].poid;

    //total poid before split
    lastPoid = poidToFinale
    lastPoid_id = this.listePoids[this.listePoids.length - 1].id;
    lastPoid_depot = this.listePoids[this.listePoids.length - 1].depot
    console.log("totalInit" + totalInitiale);



    if (depotInitiale == "gamo") {
      this.listePoids[this.listePoids.length - 1].poid = this.listePoids[this.listePoids.length - 1].poid + (this.qteGamo - totalInitiale);
    } else if (depotInitiale == "morarano") {
      this.listePoids[this.listePoids.length - 1].poid = this.listePoids[this.listePoids.length - 1].poid + (this.qteMorarano - totalInitiale);
    } else {
      this.listePoids[this.listePoids.length - 1].poid = this.listePoids[this.listePoids.length - 1].poid + (this.qteTamatave - totalInitiale);
    }

    //initalInit
    initialPoid = poidToFinale
    initialPoid_id = this.listePoids[this.listePoids.length - 1].id;
    initialPoid_depot = this.listePoids[this.listePoids.length - 1].depot
    poidToFinale = poidToFinale - this.listePoids[this.listePoids.length - 1].poid;

    //FinalInit
    finalPoid = poidToFinale
    finalPoid_id = this.listePoids[this.listePoids.length - 1].id;
    finalPoid_depot = this.listePoids[this.listePoids.length - 1].depot

    //ajout du reste dans le depot finale
    this.listePoids.push({
      id: this.number,
      poid: poidToFinale,
      depot: depotFinale.toLowerCase()
    })

    this.poidChanged.push({
      total: {
        id: lastPoid_id,
        poid: lastPoid,
        depot: lastPoid_depot
      },
      depotInitial: {
        id: initialPoid_id,
        poid: initialPoid,
        depot: initialPoid_depot
      },
      depotFinal: {
        id: finalPoid_id,
        poid: finalPoid,
        depot: finalPoid_depot
      }
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

  delete(idPoid) {
    this.listePoids = this.listePoids.filter(element => element.id != idPoid)
    this.totalGamo = this.calculePoid("gamo");
    this.totalMrrn = this.calculePoid("morarano")
    this.totalTmtv = this.calculePoid("tamatave")
    this.totalPese = this.totalGamo + this.totalMrrn + this.totalTmtv

    this.number = idPoid

  }

  update(poidId) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      data: {
        id: poidId,
        liste: this.listePoids
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        for (let i = 0; i < this.listePoids.length; i++) {
          if (this.listePoids[i].id == poidId) {
            this.listePoids[i].poid = result[0];
            this.listePoids[i].depot = result[1];
          }
        }
      }
      this.totalGamo = this.calculePoid("gamo");
      this.totalMrrn = this.calculePoid("morarano")
      this.totalTmtv = this.calculePoid("tamatave")
      this.totalPese = this.totalGamo + this.totalMrrn + this.totalTmtv
    })
  }

  openDoneDialog() {
    const dialog = this.dialog.open(DonePesageComponent, {
      disableClose: true,
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.telecharger();
      }
    })
  }

  telecharger() {
    if (!this.listePoids || this.listePoids.length <= 1) return; // Ne pas exporter si la liste est vide (ignore l'élément initial avec poid 0)

    // Créer un nouvel objet jsPDF
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let y = margin;

    // Ajouter un titre
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    const title = "Rapport de Pesage";
    // Version compatible avec anciennes versions jsPDF
    doc.text(title, pageWidth / 2, y, { align: 'center' });
    y += 15;

    // Ajouter la date et l'heure
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const date = new Date().toLocaleDateString('fr-FR');
    const time = new Date().toLocaleTimeString('fr-FR');
    doc.text(`Date: ${date} - Heure: ${time}`, margin, y);
    y += 15;

    // Ajouter les informations de résumé
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text("Résumé des quantités:", margin, y);
    y += 8;

    doc.setFont('helvetica', 'normal');
    doc.text(`Total Gamo: ${this.totalGamo.toFixed(2)} kg / ${this.qteGamo.toFixed(2)} kg (${Math.round(this.totalGamo / this.qteGamo * 100).toFixed(2)}%)`, margin, y);
    y += 6;
    doc.text(`Total Morarano: ${this.totalMrrn.toFixed(2)} kg / ${this.qteMorarano.toFixed(2)} kg (${Math.round(this.totalMrrn / this.qteMorarano * 100).toFixed(2)}%)`, margin, y);
    y += 6;
    doc.text(`Total Tamatave: ${this.totalTmtv.toFixed(2)} kg / ${this.qteTamatave.toFixed(2)} kg (${Math.round(this.totalTmtv / this.qteTamatave * 100).toFixed(2)}%)`, margin, y);
    y += 6;
    doc.text(`Total Pesé: ${this.totalPese.toFixed(2)} kg / ${this.qteNafarana.toFixed(2)} kg (${Math.round(this.totalPese / this.qteNafarana * 100).toFixed(2)}%)`, margin, y);
    y += 15;

    // Entête du tableau
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, y, pageWidth - 2 * margin, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text("N°", margin + 10, y + 6);
    doc.text("Poids (kg)", margin + 45, y + 6);
    doc.text("Dépôt", margin + 100, y + 6);
    y += 12;

    // Filtrer l'entrée initiale (celle avec id=0 et poid=0)
    const filteredList = this.listePoids.filter(item => item.id !== 0);

    // Contenu du tableau
    doc.setFont('helvetica', 'normal');
    filteredList.forEach((item, index) => {
      // Vérifier si on doit créer une nouvelle page
      if (y > pageHeight - margin) {
        doc.addPage();
        y = margin;

        // Répéter l'entête du tableau sur la nouvelle page
        doc.setFillColor(240, 240, 240);
        doc.rect(margin, y, pageWidth - 2 * margin, 8, 'F');
        doc.setFont('helvetica', 'bold');
        doc.text("N°", margin + 10, y + 6);
        doc.text("Poids (kg)", margin + 45, y + 6);
        doc.text("Dépôt", margin + 100, y + 6);
        y += 12;
        doc.setFont('helvetica', 'normal');
      }

      // Dessiner une ligne grise pour les lignes paires
      if (index % 2 === 0) {
        doc.setFillColor(248, 248, 248);
        doc.rect(margin, y - 6, pageWidth - 2 * margin, 8, 'F');
      }

      // Formater le dépôt avec la première lettre en majuscule
      const depot = item.depot.charAt(0).toUpperCase() + item.depot.slice(1);

      doc.text(item.id.toString(), margin + 10, y);
      doc.text(item.poid.toFixed(2).toString(), margin + 45, y);
      doc.text(depot, margin + 100, y);
      y += 8;
    });

    // Ajouter un pied de page
    const pageCount = doc.internal.pages.length - 1; // -1 car jsPDF commence l'indexation à 1
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Page ${i} / ${pageCount}`, pageWidth - 40, pageHeight - 10);
    }

    // Sauvegarder le PDF
    doc.save(`rapport_pesage_${date}.pdf`);
  }

  stockPoidChangeDepot() {
    console.log(this.poidChanged)
  }


}
