import { Component, OnInit } from '@angular/core';
import { ParticipantService } from '../participant.service';
import { Participant } from '../participant.model';
import { ElectronService } from '../electron.service';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.css']
})
export class LotteryComponent implements OnInit {
  show: boolean;
  disabled: boolean;
  displayPlayer = 'Player';
  constructor(private participantService: ParticipantService, 
              private electron: ElectronService) {}

  ngOnInit() {
    this.show = this.participantService.getAllParticipant().length === 0 ? true : false;
    this.disabled = this.participantService.getAllParticipant().length === 0 ? true : false;
    const body = document.getElementsByTagName('body').item(0);
    const text = <HTMLElement>document.getElementById('noPart');
  }

  go() {
    this.disabled = true;
    const allParticipant: Participant[] = this.participantService.getAllParticipant();
    const listParticipant: string[] = [];
    allParticipant.forEach( element => {
      for (let i = 0; i < element.nbTicket; i++) {
        listParticipant.push(element.name);
      }
    });
    for (let i = listParticipant.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [listParticipant[i], listParticipant[j]] = [listParticipant[j], listParticipant[i]];
    }
    const winPos = Math.floor(Math.random() * (listParticipant.length + 1));
    this.winner(listParticipant).then(() => {
      this.displayPlayer = listParticipant[winPos];
      let electronWinner = this.displayPlayer;
      this.reveal();
      /* sending winer name to electron */
      this.electron.ipcRenderer.send('lottery-is-done', electronWinner);
      
    });
  }

  async winner(list: string[]) {
    for (let n = 0; n < 3; n++) {
      let ms: number;
      if (n === 0) {ms = 75; }
      if (n === 1) {ms = 100; }
      if (n === 2) {ms = 150; }
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < list.length; i++) {
        this.displayPlayer = list[i];
        await this.delay(ms);
        this.displayPlayer = '';
        await this.delay(ms);
      }
    }
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  reveal() {
    document.getElementById('displayPlayer').classList.add('win');
  }

  nbOfParticipant() {
    return this.participantService.getAllParticipant().length;
  }

  nbOfTicket() {
    return this.participantService.getNumberOfTicket();
  }
}
