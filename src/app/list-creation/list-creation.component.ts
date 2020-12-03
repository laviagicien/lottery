import { Component, OnInit } from '@angular/core';
import { ParticipantService } from '../participant.service';
import { Participant } from '../participant.model';
import { ElectronService } from '../electron.service';

@Component({
  selector: 'app-list-creation',
  templateUrl: './list-creation.component.html',
  styleUrls: ['./list-creation.component.css']
})
export class ListCreationComponent implements OnInit {

  prize: string;
  prizeValidation: boolean;

  constructor(private participantService: ParticipantService,
              private electronService: ElectronService) { }

  ngOnInit() {
    (document.getElementById('name') as HTMLInputElement).focus();
    this.prize = this.electronService.ipcRenderer.sendSync('get-prize');
  }

  addParticipant() {
    const name: string = (document.getElementById('name') as HTMLInputElement).value.toString();
    const ticket: string = (document.getElementById('nbT') as HTMLInputElement).value.toString();
    const participant: Participant = new Participant(name, parseInt(ticket, 10));
    this.participantService.setParticpant(participant);
    (document.getElementById('name') as HTMLInputElement).value = '';
    (document.getElementById('nbT') as HTMLInputElement).value = '';
    (document.getElementById('name') as HTMLInputElement).focus();
  }

  deleteAParticipant(id: number) {
    this.participantService.deleteAParticipant(id);
  }

  updateStatus(i: number) {
    if ((document.getElementById('updateLine' + i.toString()) as HTMLElement)
          .classList.contains('hide')) {
            (document.getElementById('updateLine' + i.toString()) as HTMLElement)
              .classList.remove('hide');
    } else {
      (document.getElementById('updateLine' + i.toString()) as HTMLElement)
        .classList.add('hide');
    }
    (document.getElementById('nameUpdt') as HTMLInputElement).focus();
  }

  updateParticipant(id: number) {
    const name: string = (document.getElementById('nameUpdt' + id.toString()) as HTMLInputElement)
                            .value;
    const nbTicket: string = (document.getElementById('nbTUpdt' + id.toString()) as HTMLInputElement)
                            .value;
    this.participantService.updateAParticipant(id, name, parseInt(nbTicket, 10));
    (document.getElementById('updateLine' + id.toString()) as HTMLElement)
      .classList.add('hide');
  }

  getAllParticipant() {
    return this.participantService.getAllParticipant();
  }

  addPrize() {
    this.electronService.ipcRenderer.send('set-prize', this.prize);
    this.prizeValidation = this.prize.length !== 0 ? true : false; 
  }
}
