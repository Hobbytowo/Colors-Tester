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

export function hslToRgb (h = 0, s = 0, l = 0) {
  h /= 360
  let r, g, b = 0

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      t < 0 && (t += 1)
      t > 1 && (t -= 1)

      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

export function rgbToHex (rgb = [0, 0, 0]) {

  const decToHex = val => val < 16
    ? `0${val.toString(16)}`
    : val.toString(16)

  const hexaColor = `#${ rgb.map(decToHex).join('') }`

  return hexaColor
}
