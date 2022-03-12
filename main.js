var { app, Notification, BrowserWindow, Menu, nativeImage, Tray, dialog, shell } = require('electron')
let path = require('path')
var icona = nativeImage.createFromPath(path.join(__dirname, 'images/new-page.png')).resize({ width: 40, height: 40 })
var iconb = nativeImage.createFromPath(path.join(__dirname, 'images/reset.png')).resize({ width: 40, height: 40 })
var iconc = nativeImage.createFromPath(path.join(__dirname, 'images/shutdown.png')).resize({ width: 40, height: 40 })
var win, khayhethong, winChild
var _menu = [
    {
        label: 'file',
        submenu: [
            {
                label: 'new', icon: icona,
                click: () => {
                    shell.openExternal('')
                }

            },

            { type: 'separator' },
            {
                label: 'Show/Hide App', type: 'radio',
                click: () => {
                    if (win.isVisible())
                        win.hide()
                    else
                        win.show()
                }
            },
            { label: 'reset', icon: iconb },
            {
                label: 'exit', icon: iconc,
                click: () => {
                    app.quit()
                }
            },
        ]
    }
]
function hienthithongbao() {
    var tb = {
        title: 'iTunes',
        body: 'Wellcome to iTunes App Music '
    }
    var thongbao = new Notification(tb)
    var a = thongbao.addListener('click', () => {
        console.log('đọc thông báo')
    })
    a.show()
}
app.setAppUserModelId(process.execPath)
app.on('ready', () => {
    hienthithongbao()
    win = new BrowserWindow({
        width: 600,
        height: 1000,
        icon: 'images/music.png',
        title: 'pubg',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    winChild = new BrowserWindow({
        width: 400,
        height: 400,
        parent: win,
        modal: true
    })
    win.loadFile('index.html')
    winChild.loadURL('https://521dimensions.com/open-source/amplitudejs')
    var abc = Menu.buildFromTemplate(_menu)
    Menu.setApplicationMenu(abc)
    khayhethong = new Tray('images/music.png')
    khayhethong.setToolTip('app')
    var menuTray = Menu.buildFromTemplate(_menu[0].submenu)
    khayhethong.setContextMenu(menuTray)
})