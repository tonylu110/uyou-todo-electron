const path = require('path');
const { BrowserWindow } = require("electron");
const about = path.join(__dirname, './about.html');

let aboutWindow

function createAboutWindow () {
    aboutWindow = new BrowserWindow({
        width: 450,
        height: 350,
        resizable: false,
        frame: false,
        icon: path.join(__dirname, '../../../dist/logo.png'),
        vibrancy: "menu",
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    aboutWindow.loadURL(about)

    aboutWindow.webContents.openDevTools({ mode: 'detach' })

    return aboutWindow
}

module.exports = createAboutWindow