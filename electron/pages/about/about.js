const path = require('path');
const { MicaBrowserWindow } = require("mica-electron");
const about = path.join(__dirname, './about.html');

let aboutWindow

function createAboutWindow () {
    aboutWindow = new MicaBrowserWindow({
        width: 450,
        height: 350,
        resizable: false,
        frame: false,
        icon: path.join(__dirname, '../../../dist/logo.png'),
        background: '#00000000',
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    aboutWindow.setRoundedCorner()
    aboutWindow.setCustomEffect(4, '#edd9b7', 0.5);
    aboutWindow.setAlwaysOnTop(true)

    aboutWindow.loadURL(about)

    return aboutWindow
}

module.exports = createAboutWindow