//Electron Related requirement
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const { generateKeyPairSync } = require('crypto');
const { table } = require('console');
const fs = require('fs');
let win;

// Database Related requirement

var sqlite = require('sqlite3');
const { detectBufferEncoding } = require('tslint/lib/utils');

var knex = require('knex')(
  { 
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, '/dist/lottery/data/settings.db')
    },
    useNullAsDefault: true
  }
)


function createWindow() {
    win = new BrowserWindow(
      { 
        width: 1020, 
        height: 650,
        frame: false,
        webPreferences: {
          nodeIntegration: true,
        } 
      });
   
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, `/dist/lottery/index.html`),
        protocol: "file:",
        slashes: true
      })
    );

    win.setResizable(false); //Avoid user to resize window

    let dbDir = path.join(__dirname, '/dist/lottery/data');

    if(!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir)
    }

    let db = new sqlite.Database(path.join(__dirname, '/dist/lottery/data/settings.db'));

    db.run('CREATE TABLE IF NOT EXISTS settings (setting TEXT, value TEXT)');

    // The following is optional and will open the DevTools:
    win.webContents.openDevTools();

    // close window
    win.on("closed", () => {
      win = null;
    });
   
  }

  app.on('ready', createWindow);
  
  // on macOS, closing the window doesn't quit the app
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });