//Electron Related requirement
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const { generateKeyPairSync } = require('crypto');
const { table } = require('console');
let win;

// Database Related requirement
var knex = require('knex')(
  { 
    client: 'sqlite3',
    connection : {
      filename: path.join(__dirname, '/dist/lottery/data/settings.db')
    }
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

    win.setResizable(false); //Avoid user to resize windoww

    ipcMain.on('mainWindowLoaded', () => {
      knex.schema.createTable('settings', table => (
        table.increments('id'),
        table.string('name'),
        table.string('value')
      ))
    })

    

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