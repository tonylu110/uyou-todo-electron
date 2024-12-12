import { dialog } from "electron";
import fs from "node:fs"

export function readFile(ext) {
  const filePath = dialog.showOpenDialogSync({
    title: "import file",
    filters: [
      { name: "uyou ToDo bin", extensions: [`.${ext}`] }
    ]
  })

  if (filePath) {
    return fs.readFileSync(filePath[0], "utf-8");
  }
}

export function writeFile(name, text, ext) {
    const filePath = dialog.showSaveDialogSync({
    title: "export file",
    defaultPath: name,
    filters: [
      { name: "uyou ToDo bin", extensions: [`.${ext}`] }
    ]
  })

  if (filePath) {
    fs.writeFileSync(filePath, text);
  }

  return filePath
}