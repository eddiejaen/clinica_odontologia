import { Component, ViewContainerRef } from '@angular/core';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { OdontogramService } from '../../services/odontogram.service'
import { Odontogram } from '../../class/odontogram'

// set game constants
const BOARD_SIZE: number = 10;
const BOARD_SIZE2: number = 61;



@Component({
  selector: 'app-odontogram',
  templateUrl: './odontogram.component.html',
  styleUrls: ['./odontogram.component.css'],
  providers: [OdontogramService]
})

export class OdontogramComponent {

   selected_row: number = 0;
   selected_col: number = 0;
  constructor(

    private _vcr: ViewContainerRef,
    private odontogramService: OdontogramService
  ) {

    this.createOdontograms();
  }

  // event handler for click event on
  // each tile - fires torpedo at selected tile
  clickTile(e:any) : OdontogramComponent {
  console.log(e.target);
    let id = e.target.id,
      odontogramId = id.substring(1,2),
      row = parseInt(id.substring(2,4)), col = parseInt(id.substring(4,6)),
      tile = this.odontograms[odontogramId].tiles[row][col];
      this.selected_row = row;
      this.selected_col = col;
      return;

    // this.odontograms[odontogramId].tiles[row][col].used = true;
    // this.odontograms[odontogramId].tiles[row][col].value = "X";
    return this;
  }

  createOdontograms() : OdontogramComponent {
      this.odontogramService.createOdontogram(BOARD_SIZE, BOARD_SIZE2);
    return this;
  }

  // get all odontograms and assign to odontograms property
  get odontograms () : Odontogram[] {
    return this.odontogramService.getOdontograms()
  }

  transformNumber(numero:number) : string {
    let texto = '';
    if (numero.toString().length == 1){
      texto = '0' + numero.toString()
    }else{
      texto = numero.toString()
    }

    return texto;
  }
  imprimeValor(i, j){
    let valor = this.odontogramService.clickable[i][j];
    if (valor !== "x" && valor !== "0"){
      return valor;
    }else{
      return "";
    }
  }

}
