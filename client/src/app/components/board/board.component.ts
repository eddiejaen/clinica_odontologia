import { Component, ViewContainerRef } from '@angular/core';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BoardService } from '../../services/board.service'
import { Board } from '../../class/board'

// set game constants
const NUM_PLAYERS: number = 1;
const BOARD_SIZE: number = 7;
const BOARD_SIZE2: number = 47;



@Component({
  selector: 'app-root2',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [BoardService]
})

export class BoardComponent {

  gameId: string;
  gameUrl: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port: '');

  constructor(

    private _vcr: ViewContainerRef,
    private boardService: BoardService
  ) {

    this.createBoards();
  }

  // event handler for click event on
  // each tile - fires torpedo at selected tile
  clickTile(e:any) : BoardComponent {
  console.log(e.target);
    let id = e.target.id,
      boardId = id.substring(1,2),
      row = parseInt(id.substring(2,4)), col = parseInt(id.substring(4,6)),
      tile = this.boards[boardId].tiles[row][col];
    if (!this.checkValidHit(boardId, tile)) {
      return;
    }


      // this.toastr.success("You got this.", "HURRAAA! YOU SANK A SHIP!");

    this.boards[boardId].tiles[row][col].used = true;
    this.boards[boardId].tiles[row][col].value = "X";
    return this;
  }

  checkValidHit(boardId: number, tile: any) : boolean {

    if(tile.value == "X") {
      // this.toastr.error("Don't waste your torpedos.", "You already shot here.");
      return false;
    }
    return true;
  }

  createBoards() : BoardComponent {
      this.boardService.createBoard(BOARD_SIZE, BOARD_SIZE2);
    return this;
  }

  // winner property to determine if a user has won the game.
  // once a user gets a score higher than the size of the game
  // board, he has won.


  // get all boards and assign to boards property
  get boards () : Board[] {
    return this.boardService.getBoards()
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
}
