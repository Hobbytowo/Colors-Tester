function getLuminance (rgb = [0, 0, 0]) {
  const getSRGB = decColor => decColor / 255
  const sRGBArr = rgb.map(getSRGB)

  const [R, G, B] = sRGBArr.map(color => {
    return color <= 0.03928
      ? color / 12.92
      : Math.pow(((color + 0.055) / 1.055), 2.4)
  })

  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

export function getContrastRatio (rgb1, rgb2) {
  const l1 = getLuminance(rgb1)
  const l2 = getLuminance(rgb2)

  return Math.round((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05) * 100) / 100
}
