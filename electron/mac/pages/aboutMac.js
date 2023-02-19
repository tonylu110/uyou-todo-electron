const path = require('path');
const { BrowserWindow } = require("electron");
const about = path.join(__dirname, '../../pages/about/about.html');

let aboutWindow

function createAboutWindow () {
    aboutWindow = new BrowserWindow({
        width: 450,
        height: 350,
        resizable: false,
        frame: false,
        icon: path.join(__dirname, '../../../dist/logo.png'),
        vibrancy: "menu",
        titleBarStyle: 'hidden',
        maximizable: false,
        minimizable: false,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    aboutWindow.setAlwaysOnTop(true)
    aboutWindow.loadURL(`file://${about}`)

    return aboutWindow
}

module.exports = createAboutWindow