import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import  Darkmode  from 'darkmode-js';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  darkmode = new Darkmode({
    mixColor: 'white',
    backgroundColor: 'white',
    saveInCookies : false
  });

  constructor() { }

  ngOnInit() {
    const tglBtn = <HTMLInputElement>document.getElementById('darkMode')
    if(this.darkmode.isActivated()) {
      tglBtn.checked = true;
    }
  }

  darkMode() {
    this.darkmode.toggle()
  }
  
}
