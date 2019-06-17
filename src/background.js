import {
  app, protocol, BrowserWindow, ipcMain,
} from 'electron';

import {
  createProtocol,
  installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let login;
let beaconInterface;
let elderInterface;
let userInterface;

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], { secure: true });

ipcMain.on('login-success', (event, arg) => {
  if (arg === 'success') {
    win.reload();
    win.show();
    login.hide();
  }
  if (arg === 'logout') {
    app.exit(0);
  }
});

// Interface for beacon creation.
ipcMain.on('beaconInterface', (event, arg) => {
  if (arg === 'open') {
    beaconInterface = new BrowserWindow({ alwaysOnTop: true, show: true });
    beaconInterface.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}/#/createbeacon`);
    if (!process.env.IS_TEST) beaconInterface.webContents.openDevTools();
  } else if (arg === 'close') {
    beaconInterface.close();
    win.reload();
  }
});

// Interface for elder creation.
ipcMain.on('elderInterface', (event, arg) => {
  if (arg === 'open') {
    elderInterface = new BrowserWindow({ alwaysOnTop: true, show: true });
    elderInterface.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}/#/createelder`);
    if (!process.env.IS_TEST) elderInterface.webContents.openDevTools();
  } else if (arg === 'close') {
    elderInterface.close();
    win.reload();
  }
});

// Interface for user creation.
ipcMain.on('userInterface', (event, arg) => {
  if (arg === 'open') {
    userInterface = new BrowserWindow({ alwaysOnTop: true, show: true });
    userInterface.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}/#/createuser`);
    if (!process.env.IS_TEST) userInterface.webContents.openDevTools();
  } else if (arg === 'close') {
    userInterface.close();
    win.reload();
  }
});

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1600, height: 960, frame: false, backgroundColor: '#FFF', show: false,
  });
  // Create child browser window parent to win
  login = new BrowserWindow({
    parent: win, width: 400, height: 300, frame: false, show: true,
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    login.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}/#/login`);

    if (!process.env.IS_TEST) win.webContents.openDevTools();
    if (!process.env.IS_TEST) login.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }

  win.on('closed', () => {
    win = null;
  });
}


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit(0);
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools();
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit(0);
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit(0);
    });
  }
}
