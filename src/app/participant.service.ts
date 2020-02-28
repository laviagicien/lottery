import { Injectable } from '@angular/core';
import { Participant } from './participant.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  private allParticipant: Participant[] = [];

  constructor() { }

  setParticpant(participant: Participant) {
    this.allParticipant.push(participant)
  }
  getAParticipant(id: number) {
    return this.allParticipant[id];
  }
  getAllParticipant() {
    return this.allParticipant;
  }
  deleteAParticipant(id: number) {
    this.allParticipant.splice(id, 1);
  }

}
