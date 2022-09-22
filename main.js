const { app, Menu, Tray, BrowserWindow, dialog } = require('electron');
const path = require('path');
const rq = require('request-promise');
let appTray = null;
let mainWindow
const _PLATFORM = process.platform;
let isLinux = _PLATFORM === 'linux';
var mainAddr = 'https://wx.qq.com';

const createWindow = () => {
    
    var openWindow = function () {

        mainWindow = new BrowserWindow(
            {
                width: 880,
                height: 800,
                resizable: false,
                maximizable: false,
                fullscreenable: false,
                backgroundColor: 'none',
                titleBarStyle: 'hiddenInset',
                title: 'Pydes Remote',
                webPreferences: {nodeIntegration: false},
                skipTaskbar: true,
                center: true,
                autoHideMenuBar: true,
                title: 'Pydes 微信',
                }
            )

            mainWindow.loadURL(mainAddr);

            mainWindow.on('page-title-updated', (evt) => {
                evt.preventDefault();
              });
            
            var trayMenuTemplate = [
                {
                    label: '切换',
                    click(){
                    let isVisible = mainWindow.isVisible();
                    isVisible ? mainWindow.hide() : mainWindow.show();
                    }
                },
                {
                    label: '关于',
                    click: function () {
                    dialog.showErrorBox('关于', 'hello world')
                    }
                },
                {
                    label: '重启',
                    click: function () {
                        mainWindow.reload()
                    }
                },
                {
                    label: '工具 ',
                    click: function () {
                        mainWindow.toggleDevTools()
                    }
                },
                {
                    label: '退出',
                    click: function () {
                    app.quit();
                    app.exit();
                },
            }
            ]
            
            appTray = new Tray(path.join(__dirname, 'app_icon/weixin.png'));
            const contextMenu = Menu.buildFromTemplate(trayMenuTemplate)
            appTray.setToolTip('微信')
            appTray.setContextMenu(contextMenu)
            if (isLinux) {
                iconPath2 = path.join(__dirname, 'app_icon/weixin.png')
                mainWindow.setIcon(iconPath2);
            }
            
            mainWindow.on('closed', function () {
                mainWindow = null;
            });

            mainWindow.on('close', function(e){
                e.preventDefault();
                mainWindow.hide();
            });

            mainWindow.once('ready-to-show', () => {
                mainWindow.show();
                mainWindow.focus();
            })
        }
            var startUp = function () {
                rq(mainAddr).then(
                    function(htmlString) {
                        console.log('server started!');
                        openWindow();
                    }
                ).catch(
                    function(err){
                        console.log('waiting for the server start...');
                        startUp(); 
                    }
                );
            }

            startUp();
        };


        var menuTemplate = [
        {
            label: 'Hide', click: function () {
                mainWindow.hide()
            }
        }
        ]

        const menu = Menu.buildFromTemplate(menuTemplate)
        Menu.setApplicationMenu(menu)

        const gotTheLock = app.requestSingleInstanceLock();

        if (!gotTheLock) {
            app.quit()
        } else {
            app.on('second-instance', (event, commandLine, workingDirectory) => {

                if (mainWindow){
                    mainWindow.show()
                    if (mainWindow.isMinimized()) {
                    mainWindow.restore()
                    mainWindow.focus()
                    }
                }
            }
            
            )

}

app.on('ready', createWindow);


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
    app.quit();
    app.exit();
  }
});


app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});