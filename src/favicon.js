import { rgbToHex } from './colorHelpers'

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
const faviconLink = document.querySelector('link[rel="shortcut icon"]')
canvas.width = canvas.height = 16

export function getFavicon (rgb1, rgb2) {
  ctx.clearRect(0, 0, 16, 16)

  ctx.fillStyle = rgbToHex(rgb1)
  ctx.fillRect(0, 0, 8, 16)

  ctx.fillStyle = rgbToHex(rgb2)
  ctx.fillRect(8, 0, 8, 16)

  faviconLink.setAttribute('href', canvas.toDataURL())
}
