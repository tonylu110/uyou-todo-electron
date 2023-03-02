const setMicaStyle = (effect, windowPro) => {
  if (effect === 'mica') {
    windowPro.setMicaEffect()
  } else if (effect === 'tabbed') {
    windowPro.setMicaTabbedEffect()
  } else {
    windowPro.setRoundedCorner();
    windowPro.setCustomEffect(4, '#fff6dc', 0.7);
  }
}

module.exports = setMicaStyle