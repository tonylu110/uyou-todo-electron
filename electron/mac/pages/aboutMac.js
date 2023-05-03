const path = require('path');
const { BrowserWindow } = require("electron");
const NODE_ENV = process.env.NODE_ENV

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
    
    if (NODE_ENV === "development") {
        aboutWindow.loadURL('http://localhost:3000/#/about?isWin=true')
    } else {
        aboutWindow.loadFile(path.join(__dirname, `../../../dist/index.html`), {
            hash: '/about?isWin=true'
        })
    }

    require("@electron/remote/main").enable(aboutWindow.webContents)

    return aboutWindow
}

module.exports = createAboutWindow