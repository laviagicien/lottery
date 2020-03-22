import { Component, OnInit } from '@angular/core';
import { ParticipantService } from '../participant.service';
import { Participant } from '../participant.model';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.css']
})
export class LotteryComponent implements OnInit {
  show = true;
  displayPlayer = 'Player';
  constructor(private participantService: ParticipantService) { }

  ngOnInit() {
  }

  go() {
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
    console.log(listParticipant[winPos]);
    this.winner(listParticipant).then(w => this.displayPlayer = listParticipant[winPos]);
  }

  async winner(list: string[]) {
    for (let n = 0; n < 3; n++) {
      let ms: number; 
      if (n === 0) {ms = 200; }
      if (n === 1) {ms = 250; }
      if (n === 2) {ms = 300; }
      console.log(ms);
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
}
