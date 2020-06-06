import { Injectable } from '@angular/core';

// Import Electron's stuff
import { ipcRenderer, webFrame, remote, BrowserWindow } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

// Import Is electron
import isElectron from 'is-electron';

@Injectable({
  providedIn: 'root'
})

export class ElectronService {

  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  currWindow: BrowserWindow;
  fs: typeof fs;

  isElectronv = isElectron();

  constructor() {
  // Conditional imports
    if (isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.currWindow = window.require('electron').remote.getCurrentWindow();

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
  }
}

