import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import Darkmode from 'darkmode-js';
import { ElectronService } from '../electron.service';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';

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

  settings: {setting: string, value: string}[] = [];

  darkmodeStatus = false;

  logoPath = '';

  isChecked = false;

  constructor(private electron: ElectronService) { }

  ngOnInit() {
    this.settings = this.electron.ipcRenderer.sendSync('initialize');
    this.darkmodeStatus = !!+this.settings.find((row) => {
      return row.setting === 'darkmode';
    }).value;
    if (this.darkmodeStatus) {
      this.darkmode.toggle();
      const modal = document.getElementsByClassName('modal-content');
      modal.item(0).classList.toggle('modalDarkmode');
      this.isChecked = true;
    }
    this.logoPath = this.settings.find((row) => {
      return row.setting === 'imgSel';
    }).value;
    const layer = document.getElementsByClassName('darkmode-layer').item(0) as HTMLElement;
    layer.style.zIndex = '10';
  }

  darkMode(settingsForm: NgForm) {
    this.darkmode.toggle();
    const modal = document.getElementsByClassName('modal-content');
    modal.item(0).classList.toggle('modalDarkmode');
    const tmpDarkmode = !settingsForm.value.darkMode ? '1'  : '0';
    this.electron.ipcRenderer.send('set-darkmode', tmpDarkmode);

  }

  closeColor(): string {
    let color: string;
    if (document.getElementsByClassName('modal-content').item(0).classList.contains('modalDarkmode')) {
      color = 'white';
    } else {
      color = 'black';
    }
    return color;
  }

  updateSettings() {
    this.electron.ipcRenderer.send('update-settings');
    this.electron.ipcRenderer.on('settings-saved', (event, arg) => {
      document.getElementById('logo').setAttribute('src', ('./assets/image/' + arg));
    });
  }

  chooseAFile() {
    const path: string[] = this.electron.ipcRenderer.sendSync('choose-file');
    const imgPath = path[0].replace('\\', '/').split('/').pop();
    $('.imgPath').html(imgPath);
  }
}
