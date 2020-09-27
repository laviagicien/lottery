//Electron Related requirement
const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const isDev = require('electron-is-dev')
let win;

// Default path for image and database
let defPath
if (isDev) {
  defPath = path.join(app.getAppPath(), '/dist/lottery/assets');
} else {
  defPath = path.join(app.getAppPath(), '..', '..', 'resources', 'src', 'assets')
}

// Database Related requirement
var sqlite = require('sqlite3');
sqlite.verbose();
let dbDir = path.join(defPath, 'data');

let db = new sqlite.Database(dbDir + '/settings.db');

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
  // win.webContents.openDevTools();

  //INITIALIZE DB
  db.serialize(() =>{
    db.run('CREATE TABLE IF NOT EXISTS settings (setting TEXT PRIMARY KEY, value TEXT)');
    db.run('INSERT OR IGNORE INTO settings (setting, value) VALUES ("darkmode", "0"), ("imgSel", "logo_dofus_w.png")');
  });

  // close window
  win.on("closed", () => {
    win = null;
  });

  ipcMain.on('initialize', (event, arg) => {
    let query;
    db.all('SELECT * FROM settings', (err, row) => {
      query = row;
      event.returnValue = query;
    })
  })

  let newLogoPath = "";
  let newLogoName = "";
  let darkmodeSet = "";

  ipcMain.on('choose-file', (event, arg) => {
     let logoPath = dialog.showOpenDialogSync({
      title: 'Choix du logo',
      defaultPath: (defPath + "\\image"),
      filters: [{name : 'Images', extensions: ['jpg', 'png', 'gif']}],
      properties : [
        'openFile'
      ]}
    )
    event.returnValue = logoPath;
    newLogoPath = logoPath;
  });

  ipcMain.on('set-darkmode', (event, arg) => {
    darkmodeSet = arg
  });

  ipcMain.on('update-settings', (event, arg)=> {
    let pathToPaste = path.join(defPath, 'image');
    let tmpLogoName = (newLogoPath.toString()).replace('\\', '/').split('/');
    newLogoName = tmpLogoName[tmpLogoName.length - 1].toString();
    if (!fs.existsSync(path.join(pathToPaste + "/" + newLogoName))) {
      fs.copyFile(newLogoPath.toString(), path.join(pathToPaste, newLogoName), (err) => {
        if(err) {
          throw err
        }
      })
    }

    //Getting previous value
    db.serialize(() => {
      db.get('SELECT value FROM settings WHERE setting = "darkmode"', (err, row) => {
        setCurrentDarkmode(row.value);
      });
      db.get('SELECT value FROM settings WHERE setting = "imgSel"', (err, row) => {
        setCurrentLogoName(row.value);
      });
    })
    function setCurrentDarkmode (arg, value) {
      let currentDarkmode = value;
      if(darkmodeSet !== "" && darkmodeSet !== currentDarkmode) {
        db.run('UPDATE settings SET value = "' + darkmodeSet + '" WHERE setting = "darkmode"');
      }
    }
    function setCurrentLogoName (value) {
      let currentLogoName = value;
      if(newLogoName !== "" && newLogoName !== currentLogoName) {
        db.run('UPDATE settings SET value = "' + newLogoName + '" WHERE setting = "imgSel"');
        event.reply('settings-saved', newLogoName);
      } else {
        event.reply('settings-saved', currentLogoName);
      }

    }


  });
}

app.on('ready', createWindow);

// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
