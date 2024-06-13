import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Notification } from 'electron'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function sendNotification(title, msg) {
  const notification = new Notification({
    title,
    body: msg,
    icon: path.join(__dirname, '../../../dist/logo.png'),
  })
  return notification
}

export default sendNotification
