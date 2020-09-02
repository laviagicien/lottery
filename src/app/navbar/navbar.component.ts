import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import  Darkmode  from 'darkmode-js';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  darkmode = new Darkmode({
    mixColor: '#ffffff',
    backgroundColor: '#ffffff',
    saveInCookies : false
  });

  constructor() { }

  ngOnInit() {
    const tglBtn = <HTMLInputElement>document.getElementById('darkMode')
    if(this.darkmode.isActivated()) {
      tglBtn.checked = true;
    }
    const layer = <HTMLElement>document.getElementsByClassName('darkmode-layer').item(0);
    layer.style.zIndex = '10';

  }

  darkMode() {
    this.darkmode.toggle();
    const modal = document.getElementsByClassName('modal-content');
    modal.item(0).classList.toggle('modalDarkmode');
  }

  closeColor(): String{
    let color: String;
    if(document.getElementsByClassName('modal-content').item(0).classList.contains('modalDarkmode')) {
      color = "white";
    } else {
      color = "black";
    }
    return color;
  }  
}
