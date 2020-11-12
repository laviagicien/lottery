import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../electron.service';
import { Winner } from '../winner.model';

@Component({
  selector: 'app-winners-list',
  templateUrl: './winners-list.component.html',
  styleUrls: ['./winners-list.component.css']
})
export class WinnersListComponent implements OnInit {
  
  winnersColl: Winner[] = [
    new Winner("date1", "name1", "prize1"),
    new Winner("date2", "name2", "prize2"),
    new Winner("date3", "name3", "prize3")
  ];
  
  constructor(private electronService: ElectronService) { }

  ngOnInit() {

  }
  
}
