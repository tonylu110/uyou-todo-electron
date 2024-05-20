import path from 'node:path'
import { Notification } from 'electron'

function sendNotification(title, msg) {
  const notification = new Notification({
    title,
    body: msg,
    icon: path.join(__dirname, '../../../dist/logo.png'),
  })
  return notification
}

export default sendNotification
