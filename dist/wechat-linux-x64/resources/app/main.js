const { app, Menu, Tray, BrowserWindow} = require('electron');
const path = require('path');
let appTray = null;
let mainWindow
const _PLATFORM = process.platform;
let isLinux = _PLATFORM === 'linux';
let showMenuBarOnLinux = false;
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow(
    {
      width: 800, 
      height: 600,
      resizable: false,
      maximizable: false,
      fullscreenable: false,
      backgroundColor: 'none',
      titleBarStyle: 'hiddenInset',
      title: 'fuck wechat',
    }
    )
    if (isLinux) {
      iconPath2 = path.join(__dirname, 'app/wechat.png')
      mainWindow.setIcon(iconPath2
      );
      // Disable default menu bar
      if (!showMenuBarOnLinux) {
          mainWindow.setMenu(null);
      }
  }
  var trayMenuTemplate = [
    {
        label: '显示',
        click(){
          let isVisible = mainWindow.isVisible();
          isVisible ? mainWindow.hide() : mainWindow.show();
        }

    },
    {
      label: '隐藏',
      click(){
        let isVisible = mainWindow.isVisible();
        isVisible ? mainWindow.hide() : mainWindow.show();
      }

  },
  
  {
    label: '刷新',
    click(){
      mainWindow.reload();
    }
},
  
{
  label: '工具',
  click(){
    mainWindow.toggleDevTools()
  }

},

    {
        label: '退出',
         click: function () {
         app.quit();
        app.quit();
    },
  }
  ]

  mainWindow.loadFile('index.html')

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // add start 


trayIcon = path.join(__dirname, 'app');

appTray = new Tray(path.join(trayIcon, 'wechat.png'));

const contextMenu = Menu.buildFromTemplate(trayMenuTemplate)


appTray.setToolTip('微信')

appTray.setContextMenu(contextMenu)

appTray.on('click',function(){
  mainWindow.show()
})


  // add end


  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
