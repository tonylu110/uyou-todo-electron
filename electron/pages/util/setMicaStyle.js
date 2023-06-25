function setMicaStyle(effect, windowPro) {
  if (effect === 'mica')
    windowPro.setMicaEffect()

  else if (effect === 'tabbed')
    windowPro.setMicaTabbedEffect()

  else
    windowPro.setCustomEffect(4, '#eee', 0.4)
}

module.exports = setMicaStyle
