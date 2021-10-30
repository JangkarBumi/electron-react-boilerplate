const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
// eslint-disable-next-line no-unused-vars


// function createWindow() {
//   // Create the browser window.
// }
const { ipcMain } = require('electron');
ipcMain.on('close-me', (evt, arg) => {
  app.quit();
});

let tray = null;

app.on('ready',()=>{
  app.dock.hide();
  // createWindow();

 const mainWindow = new BrowserWindow({
   width: 400,
   height: 650,
  //  show: false,
   fullscreenable: false,
   resizable: false,
   frame: false, // hide browser control minimize, maximize
   webPreferences: {
     nodeIntegration: true,
     enableRemoteModule: true,
     contextIsolation: false,
   },
 });

const getWindowPosition = () => {
  const windowBounds = mainWindow.getBounds();
  const trayBounds = tray.getBounds();
  const x = Math.round(
    trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2,
  );
  const y = Math.round(trayBounds.y + trayBounds.height);
  return { x, y };
};

 const setWinPosition = () => {
    const position = getWindowPosition();
    mainWindow.setPosition(position.x, position.y, false);
  };

const showWindow = () => {
  const position = getWindowPosition();
  mainWindow.setPosition(position.x, position.y, false);
  mainWindow.show();
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.focus();
  mainWindow.setVisibleOnAllWorkspaces(false);
};


  const toggleWindow = () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      setWinPosition();
      showWindow();
      mainWindow.focus();
    }
  };

 // eslint-disable-next-line no-unused-vars
 if(!app.isPackaged){
    mainWindow.webContents.openDevTools({ mode: 'detach' });
    const electronReload = require('electron-reload');
 }

 mainWindow.loadURL(
   app.isPackaged
     ? `file://${path.join(__dirname, '../build/index.html')}`
     : 'http://localhost:3000',
 );



  tray = new Tray(path.join(__dirname, './assets/cup.png'));

  const rightClickMenu = () => {
    const menu = [
      {
        label: 'Logs',
        type: 'checkbox',
        click: (event) =>console.log('Open Logs'),
        accelerator: 'Command+L'
      },
      {
        type: 'separator',
      },
      {
        role: 'quit',
        accelerator: 'Command+Q',
      },
    ];

    tray.popUpContextMenu(Menu.buildFromTemplate(menu));
  };

  setWinPosition();

  tray.setIgnoreDoubleClickEvents(true)

  tray.on('click', function() { toggleWindow() })

  tray.on('right-click',rightClickMenu)

  // const contextMenu = Menu.buildFromTemplate([
  //   {
  //     label: 'Open Main Window',
  //     type: 'normal',
  //     click: () => {
  //       /* Open the Main Window */
  //         win.show();
  //     },
  //   },
  //   { label: 'Item2', type: 'radio' },
  //   { label: 'Item3', type: 'radio', checked: true },
  //   { label: 'Item4', type: 'radio' },
  // ]);
  // tray.setTitle('hello world');
  // tray.setToolTip('This is my application.');
  // tray.setContextMenu(contextMenu);
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// app.on('activate', function () {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (BrowserWindow.getAllWindows().length === 0) createWindow();
// });
