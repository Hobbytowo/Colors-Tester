import React, { Component } from 'react';
import './color.scss';
import { hslToRgb, rgbToHex } from './colorHelpers'

class Color extends Component {
  state = {
    hex: ''
  }

  // on color change event
  onColorChange = e => {
    const [ valueName, name ] = e.target.name.split('-')
    const value = e.target.value * 1

    const { color: { hue, saturation, lightness }} = this.props
    const rgb = hslToRgb(hue, saturation, lightness)

    this.setState({
      hex: rgbToHex(rgb)
    })

    this.props.onColorChange({
      name: name + 'Color',
      valueName: valueName,
      value: value,
      rgb: rgb
      })
  }

  // get initial values
  constructor(props) {
    super(props)
    const { color: { name, hue, saturation, lightness }} = props

    const rgb = hslToRgb(hue, saturation, lightness)

    // get initial hexa values
    this.state.hex = rgbToHex(rgb)

    // send initial rgb value to App component
    this.props.onColorChange({
      name: name + 'Color',
      valueName: 'hue',
      value: hue,
      rgb: rgb
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
            <div className="form__item">
              <label className="form__label" htmlFor={ `hue${ name }`}>Hue { hue }&#176;</label>
              <input
                onChange={ this.onColorChange }
                type="range"
                name={ `hue-${ name }` }
                id={ `hue${ name }` }
                className="form__input input input--range"
                min="0"
                max="360"
                value={ hue }
                step="1"
              />
            </div>
            <div className="form__item">
              <label className="form__label" htmlFor={ `saturation${ name }`}>Saturation { saturation }</label>
              <input
                onChange={ this.onColorChange }
                type="range"
                name={ `saturation-${ name }` }
                id={ `saturation$${ name }` }
                className="form__input input input--range"
                min="0"
                max="1"
                value={ saturation }
                step="0.01"
              />
            </div>
            <div className="form__item">
              <label className="form__label" htmlFor={ `lightness${ name }`}>Lightness { lightness }</label>
              <input
                onChange={ this.onColorChange }
                type="range"
                name={ `lightness-${ name }` }
                id={ `lightness${ name }` }
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
