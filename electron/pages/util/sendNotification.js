const path = require('node:path')
const { Notification } = require('electron')

function sendNotification(title, msg) {
  const notification = new Notification({
    title,
    body: msg,
    icon: path.join(__dirname, '../../../dist/logo.png'),
  })

  return notification
}

module.exports = sendNotification
