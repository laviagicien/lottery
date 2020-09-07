//Electron Related requirement
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
let win;

// Database Related requirement
var sqlite = require('sqlite3');
sqlite.verbose();
let dbDir = path.join(__dirname, '/src/data');
if(!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir)
}
let db = new sqlite.Database(path.join(dbDir, '/settings.db'));

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

    // The following is optional and will open the DevTools:
    win.webContents.openDevTools();

    //INITIALIZE DB
    db.serialize(() =>{
      db.run('CREATE TABLE IF NOT EXISTS settings (setting TEXT PRIMARY KEY, value TEXT)');
      db.run('INSERT OR IGNORE INTO settings (setting, value) VALUES ("darkmode", "0")');
    });

    // close window
    win.on("closed", () => {
      win = null;
    });
    
    ipcMain.on('initialize', (event, arg) => {
      let query;
      db.get('SELECT * FROM settings', (err, row) => {
        query = row;
        event.returnValue = query;
      })
    })

    /* ipcMain.on('update-settings', (event, arg)=> {
      console.log('data received : ' + arg)
     }); */
  }

app.on('ready', createWindow);

// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
