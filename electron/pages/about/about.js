const path = require('path');
const { MicaBrowserWindow, IS_WINDOWS_11 } = require("mica-electron");
const about = path.join(__dirname, './about.html');
const { micaStyle, menuBlur } = require('../../store/menuBlurStore')
const setMicaStyle = require('../util/setMicaStyle')

let aboutWindow

function createAboutWindow () {
    aboutWindow = new MicaBrowserWindow({
        width: 450,
        height: 350,
        resizable: false,
        frame: false,
        icon: path.join(__dirname, '../../../dist/logo.png'),
        background: '#00000000',
        show: false,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    aboutWindow.setLightTheme()

    if (menuBlur || menuBlur === undefined) {
        if (IS_WINDOWS_11) {
            setMicaStyle(micaStyle ? micaStyle : 'mica', aboutWindow)
        } else {
            aboutWindow.setCustomEffect(4, '#fff6dc', 0.7);
        }
    } else {
        aboutWindow.setCaptionColor('#fff6dc')
        aboutWindow.setCustomEffect(1, '#fff6dc', 1);
    }
    aboutWindow.setAlwaysOnTop(true)

    aboutWindow.loadURL(about)

    aboutWindow.once('ready-to-show', () => {
        aboutWindow.show()
    })

    return aboutWindow
}

module.exports = createAboutWindow