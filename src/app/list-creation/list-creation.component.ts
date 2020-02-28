import { Component, OnInit } from '@angular/core';
import { ParticipantService } from '../participant.service';
import { Participant } from '../participant.model';

@Component({
  selector: 'app-list-creation',
  templateUrl: './list-creation.component.html',
  styleUrls: ['./list-creation.component.css']
})
export class ListCreationComponent implements OnInit {


  constructor(private participantService: ParticipantService) { }

  ngOnInit() {
  }

  addParticipant() {
    const name: string = (document.getElementById('name') as HTMLInputElement).value.toString();
    const ticket: string = (document.getElementById('nbT') as HTMLInputElement).value.toString();
    const participant: Participant = new Participant(name, parseInt(ticket, 10));
    this.participantService.setParticpant(participant);
    (document.getElementById('name') as HTMLInputElement).value = '';
    (document.getElementById('nbT') as HTMLInputElement).value = '';
      

  }

  deleteAParticipant(id: number) {
    this.participantService.deleteAParticipant(id)
  }


}
