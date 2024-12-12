function setMicaStyle(effect, windowPro) {
  if (effect === 'mica')
    windowPro.setMicaEffect()
  else if (effect === 'tabbed')
    windowPro.setMicaTabbedEffect()
  else
    windowPro.setMicaAcrylicEffect()
}
export default setMicaStyle
