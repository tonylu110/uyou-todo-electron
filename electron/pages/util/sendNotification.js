const { Notification } = require('electron')

function sendNotification(title, msg) {
  const notification = new Notification({
    title,
    body: msg,
  })

  return notification
}

module.exports = sendNotification
