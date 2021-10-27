const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

// function createWindow() {
//   // Create the browser window.
// }

let tray = null;

app.on('ready',()=>{
  app.dock.hide();
  // createWindow();

 const win = new BrowserWindow({
   width: 800,
   height: 600,
   webPreferences: {
     nodeIntegration: true,
     enableRemoteModule: true,
   },
 });

 !app.isPackaged && win.webContents.openDevTools()

 win.loadURL(
   app.isPackaged
     ? `file://${path.join(__dirname, '../build/index.html')}`
     : 'http://localhost:3000',
 );

  tray = new Tray(path.join(__dirname, './assets/cup.png'));

 tray.on('click', function() { win.show() })

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

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
