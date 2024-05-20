window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element)
      element.textContent = text
  }
  for (const dependency of ['chrome', 'node', 'electron'])
    // eslint-disable-next-line node/prefer-global/process
    replaceText(`${dependency}-version`, process.versions[dependency])
})
