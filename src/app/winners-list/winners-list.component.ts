import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../electron.service';
import { Winner } from '../winner.model';
import { WinnersService } from '../winners.service'

@Component({
  selector: 'app-winners-list',
  templateUrl: './winners-list.component.html',
  styleUrls: ['./winners-list.component.css']
})
export class WinnersListComponent implements OnInit {
  
  winnersColl: Winner[];
  
  constructor(private electronService: ElectronService,
              private winServ: WinnersService) { }

  ngOnInit() {
    this.winServ.getWinner();
    this.winnersColl = this.winServ.getWinCol();
  }
  
  deleteWinner(i: number) {
    this.winServ.removeWinner(i);
    this.winnersColl = [];
    this.winServ.getWinner();
    this.winnersColl = this.winServ.getWinCol();
  }


}
