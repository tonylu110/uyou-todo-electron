let fontSize

function useFontSize(size) {
  if (size === 0) {
    fontSize = `
      * {
        font-size: 0.85rem;
      }
    `
  } else if (size === 66) {
    fontSize = `
      * {
        font-size: 1.15rem;
      }
    `
  } else if (size === 99) {
    fontSize = `
      * {
        font-size: 1.25rem;
      }
    `
  } else {
    fontSize = `
      * {
        font-size: 1rem;
      }
    `
  }
  return fontSize
}

module.exports = useFontSize