let fontSize = ''

function useFontSize(size: string, init: boolean): string {
  const stringSize = `${size}`
  if (stringSize === '0') {
    fontSize = `
      * {
        font-size: 0.85rem;
      }
    `
  }
  else if (stringSize === '66') {
    fontSize = `
      * {
        font-size: 1.15rem;
      }
    `
  }
  else if (stringSize === '99') {
    fontSize = `
      * {
        font-size: 1.25rem;
      }
    `
  }
  else {
    if (!init) {
      fontSize = `
        * {
          font-size: 1rem;
        }
      `
    }
  }
  return fontSize
}
export default useFontSize
