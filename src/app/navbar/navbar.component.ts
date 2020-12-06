import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { ElectronService } from '../electron.service';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
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
      this.darkmodeToggle();
      const modal = document.getElementsByClassName('modal-content');
      modal.item(0).classList.toggle('modalDarkmode');
      this.isChecked = true;
    }
    this.logoPath = this.settings.find((row) => {
      return row.setting === 'imgSel';
    }).value;
  }

  darkMode(settingsForm: NgForm) {
    this.darkmodeToggle();
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

  darkmodeToggle() {
    document.getElementsByTagName('body').item(0).classList.toggle('darkmode');
  }

  deleteDB() {
    this.electron.ipcRenderer.send('delete-winner-db');
    this.electron.ipcRenderer.on('winner-db-deleted', async () => {
      const delay = async (ms: number) => new Promise(res => setTimeout(res, ms));
      document.getElementsByClassName('st0').item(0).classList.toggle('dash');
      await delay(2500);
      document.getElementsByClassName('st0').item(0).classList.toggle('dash');
    })
  }
}
