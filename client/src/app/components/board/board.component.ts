import { Component, ViewContainerRef } from '@angular/core';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BoardService } from '../../services/board.service'
import { Board } from '../../class/board'

// set game constants
const NUM_PLAYERS: number = 1;
const BOARD_SIZE: number = 48;



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
  fireTorpedo(e:any) : BoardComponent {
    let id = e.target.id,
      boardId = id.substring(1,2),
      row = id.substring(2,3), col = id.substring(3,4),
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
      this.boardService.createBoard(BOARD_SIZE);
    return this;
  }

  // winner property to determine if a user has won the game.
  // once a user gets a score higher than the size of the game
  // board, he has won.


  // get all boards and assign to boards property
  get boards () : Board[] {
    return this.boardService.getBoards()
  }
}
