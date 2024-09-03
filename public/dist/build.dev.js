"use strict";

/* eslint-disable prettier/prettier */

/* eslint-disable @typescript-eslint/no-var-requires */
var path = require('path');

var _require = require('electron'),
    app = _require.app,
    BrowserWindow = _require.BrowserWindow,
    shell = _require.shell,
    globalShortcut = _require.globalShortcut,
    Menu = _require.Menu,
    ipcMain = _require.ipcMain;

var electron = require('electron');

var name = electron.app.getName();

var electronLocalshortcut = require('electron-localshortcut');

var contextMenu = require('electron-context-menu');

contextMenu({}); // Set the path of the folder where the persisted data is stored

electron.app.setPath('userData', path.join(electron.app.getPath('home'), '.bitxor-desktop-wallet'));
var iconUrlPath = process.platform === 'darwin' ? './dist/assets/logo.png' : "file://".concat(__dirname, "/../dist/assets/logo.png");
var loadUrlPath = process.platform === 'darwin' ? './dist/index.html' : "file://".concat(__dirname, "/../dist/index.html");
var mainWindow = null;
var template = [{
  label: 'Window',
  role: 'window',
  submenu: [{
    label: 'Minimize',
    accelerator: 'CmdOrCtrl+M',
    role: 'minimize'
  }, {
    label: 'Close',
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  }, {
    label: 'Toggle Full Screen',
    accelerator: function () {
      if (process.platform === 'darwin') {
        return 'Ctrl+Command+F';
      }

      return 'F11';
    }(),
    click: function click(item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
      }
    }
  }, {
    label: 'Toggle Developer Tools',
    accelerator: function () {
      if (process.platform === 'darwin') {
        return 'Alt+Command+I';
      }

      return 'Ctrl+Shift+I';
    }(),
    click: function click(item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.toggleDevTools();
      }
    }
  }]
}, {
  label: 'Edit',
  role: 'edit',
  submenu: [{
    label: 'Cut',
    accelerator: 'CmdOrCtrl+X',
    role: 'cut'
  }, {
    label: 'Copy',
    accelerator: 'CmdOrCtrl+C',
    role: 'copy'
  }, {
    label: 'Paste',
    accelerator: 'CmdOrCtrl+V',
    role: 'paste'
  }, {
    label: 'Select All',
    accelerator: 'CmdOrCtrl+A',
    role: 'selectAll'
  }]
}, {
  label: 'Help',
  role: 'help',
  submenu: [{
    label: 'Learn More',
    click: function click() {
      electron.shell.openExternal('https://www.bitxor.io/');
    }
  }, {
    label: 'About Bitxor Wallet',
    click: function click() {
      electron.shell.openExternal('https://www.bitxor.io/');
    }
  }]
}];

if (process.platform === 'darwin') {
  template.unshift({
    label: name,
    submenu: [{
      label: "About ".concat(name),
      role: 'about'
    }, {
      type: 'separator'
    }, {
      label: 'Services',
      role: 'services',
      submenu: []
    }, {
      type: 'separator'
    }, {
      label: "Hide ".concat(name),
      accelerator: 'Command+H',
      role: 'hide'
    }, {
      label: 'Hide others',
      accelerator: 'Command+Alt+H',
      role: 'hideothers'
    }, {
      label: 'Show',
      role: 'unhide'
    }, {
      type: 'separator'
    }, {
      label: 'Quit',
      accelerator: 'Command+Q',
      click: function click() {
        app.quit();
      }
    }]
  });
  if (process.mas) app.setName('·');
  ipcMain.on('app', function (event, arg) {
    switch (arg) {
      case 'quit':
        mainWindow.close();
        break;

      case 'max':
        if (mainWindow.isMaximized()) {
          mainWindow.restore();
        } else {
          mainWindow.maximize();
        }

        break;

      case 'min':
        mainWindow.minimize();
        break;
    }
  });
}

if (process.platform !== 'darwin') {
  var gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    app.quit();
  } else {
    app.on('second-instance', function () {
      // Do not allow the creation of multiple instances
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
      }
    });
    app.on('ready', function () {
      /** This function body is needed */
    });
  }

  ipcMain.on('app', function (event, arg) {
    switch (arg) {
      case 'quit':
        mainWindow.close();
        break;

      case 'max':
        mainWindow.maximize();
        break;

      case 'unMaximize':
        mainWindow.unmaximize();
        break;

      case 'min':
        mainWindow.minimize();
        break;

      default:
        mainWindow.unmaximize();
    }
  });
}

function initialize() {
  function createMac() {
    var size = require('electron').screen.getPrimaryDisplay().workAreaSize;

    var width = parseInt(size.width);
    var widthTag = width * 0.3;
    var height = width * 0.45;

    if (width >= 1920) {
      mainWindow = new BrowserWindow({
        width: width - widthTag,
        height: height,
        autoHideMenuBar: false,
        resizable: true,
        webPreferences: {
          nodeIntegration: false,
          enableRemoteModule: false,
          preload: path.resolve(__dirname, 'preload.js')
        }
      });
    } else {
      height = parseInt(1080 * size.width / 1920 + 30);
      mainWindow = new BrowserWindow({
        width: width - 100,
        height: height - 50,
        autoHideMenuBar: false,
        resizable: true,
        webPreferences: {
          nodeIntegration: false,
          enableRemoteModule: false,
          preload: path.resolve(__dirname, 'preload.js')
        }
      });
    }

    mainWindow.loadFile(loadUrlPath);
    mainWindow.on('closed', function () {
      mainWindow = null;
    });
    var menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }

  function createWindow() {
    var size = electron.screen.getPrimaryDisplay().workAreaSize;
    var originWidth = size.width;
    var width = originWidth;

    if (originWidth > 1080) {
      width = parseInt(1080 + (originWidth - 1080) * 0.5);
    }

    var height = parseInt(width / (1920 / 1080));
    var windowOptions = {
      minWidth: width,
      minHeight: height,
      width: width,
      height: height,
      title: app.getName(),
      titleBarStyle: 'hiddenInset',
      webPreferences: {
        nodeIntegration: false,
        enableRemoteModule: false,
        preload: path.resolve(__dirname, 'preload.js')
      },
      resizable: true
    };
    windowOptions.icon = iconUrlPath;
    mainWindow = new BrowserWindow(windowOptions);
    mainWindow.setMenu(null);
    mainWindow.loadURL(loadUrlPath);
    mainWindow.once('ready-to-show', function () {
      mainWindow.show();
    });
    mainWindow.on('closed', function () {
      mainWindow = null;
    });
    mainWindow.on('will-resize', function (event) {
      event.preventDefault();
    });
  }

  if (process.platform === 'darwin') {
    app.on('ready', createMac);
  } else {
    app.on('ready', createWindow);
    app.on('ready', function () {
      electronLocalshortcut.register('CommandOrControl+R', function () {
        mainWindow.reload();
      });
    });
  }

  app.on('window-all-closed', function () {
    app.quit();
  });
  app.on('web-contents-created', function (e, webContents) {
    webContents.on('new-window', function (event, url) {
      event.preventDefault();

      if (url.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g)) {
        shell.openExternal(url);
      }
    });
  });
}

initialize();