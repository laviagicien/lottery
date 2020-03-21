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
    this.winner(listParticipant);
  }

  winner(list: string[]) {
    const winPos = Math.floor(Math.random() * (list.length + 1));
    for (let i = 0; i < list.length; i++) {
      setTimeout(() => {this.displayPlayer = list[i]; }, i * 500);
      setTimeout(() => {this.displayPlayer = ''; }, (i + 0.5) * 500);
    }
  }

}
