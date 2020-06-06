import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'src/app/electron.service';

@Component({
  selector: 'app-electron',
  templateUrl: './electron.component.html',
  styleUrls: ['./electron.component.css']
})
export class ElectronComponent implements OnInit {



  constructor(private electron: ElectronService) { }

  ngOnInit() {
    
  }

  closeWindow() {
    this.electron.currWindow.close();
  }

  minimizeWindow() {
    this.electron.currWindow.minimize();
  }

}
