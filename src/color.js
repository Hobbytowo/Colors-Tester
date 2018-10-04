import React, { Component } from 'react';

class Color extends Component {
  state = {
    hex: ''
  }

  // get rgb color from hsl
  hslToRgb = (h, s, l) => {
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

  // get hexa color from rgb
  rgbToHex = x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  // on color change event
  onColorChange = e => {
    const [ valueName, name ] = e.target.name.split('-')
    const value = e.target.value * 1

    const { color: { hue, saturation, lightness }} = this.props
    const [r, g, b] = this.hslToRgb(hue, saturation, lightness)

    this.setState({
      hex: `#${ this.rgbToHex(r) }${ this.rgbToHex(g) }${ this.rgbToHex(b) }`
    })

    this.props.onColorChange({
      name: name + 'Color',
      valueName: valueName,
      value: value,
      rgb: [r, g, b]
      })
  }

  // get initial values
  constructor(props) {
    super(props)
    const { color: { name, hue, saturation, lightness }} = props

    const [ r, g, b ] = this.hslToRgb(hue, saturation, lightness)

    // get initial hexa values
    this.state.hex = `#${ this.rgbToHex(r) }${ this.rgbToHex(g) }${ this.rgbToHex(b) }`

    // send initial rgb value to App component
    this.props.onColorChange({
      name: name + 'Color',
      valueName: 'hue',
      value: hue,
      rgb: [r, g, b]
    })
  }

  render() {
    const { color: { name, hue, saturation, lightness }} = this.props

    return (
      <article className={`main__article article article--${ name }`}>
        <form className="article__form form">
          <div className="form__color">
            <label className="form__label" htmlFor={ `${ name }Color` }>
              { name } color:
            </label>
            <input
              className="form__input"
              id={ `${ name }Color` }
              type="text"
              placeholder={ this.state.hex }/>
          </div>
          <div className="form__ranges">
            <div className="from__item">
              <label className="form__label" htmlFor={ `hue${ name }`}>Hue { hue }&#176;</label>
              <input
                onChange={ this.onColorChange }
                type="range"
                name={ `hue-${ name }`}
                id={ `hue${ name }`}
                className="form__input input input--range"
                min="0"
                max="360"
                value={ hue }
                step="1"
              />
            </div>
            <div className="from__item">
              <label className="form__label" htmlFor={ `saturation${ name }`}>Saturation { saturation }</label>
              <input
                onChange={ this.onColorChange }
                type="range"
                name={ `saturation-${ name }`}
                id={ `saturation$${ name }`}
                className="form__input input input--range"
                min="0"
                max="1"
                value={ saturation }
                step="0.01"
              />
            </div>
            <div className="from__item">
              <label className="form__label" htmlFor={ `lightness${ name }`}>Lightness { lightness }</label>
              <input
                onChange={ this.onColorChange }
                type="range"
                name={ `lightness-${ name }`}
                id={ `lightness${ name }`}
                className="form__input input input--range"
                min="0"
                max="1"
                value={ lightness }
                step="0.01"
              />
            </div>
          </div>
        </form>
      </article>
    )
  }
}

export default Color
