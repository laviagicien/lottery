import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { Winner } from './winner.model'

@Injectable({
  providedIn: 'root'
})
export class WinnersService {

  private winCol: Winner[];
  

  constructor(private electron: ElectronService) {}

  getWinner() {
    let receivedWinner: [] = this.electron.ipcRenderer.sendSync('get-winners');
    this.winCol = [];
    receivedWinner.forEach(({id, date, winner, prize})  => {
      this.winCol.push(new Winner(id, date, winner, prize))
    });
  }

  removeWinner(i: any) {
    this.electron.ipcRenderer.send('remove-winner', i);
    this.electron.ipcRenderer.on('winner-removed', (event) => {
      this.getWinner();
    })
  }

  getWinCol(): Winner[] {
    return this.winCol;
  }

  


}
