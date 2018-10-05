import React, { Component } from 'react';
import './App.scss';
import Color from './color'

class App extends Component {
  state = {
    textColor: {
      name: 'text',
      hue: 116,
      saturation: 0.44,
      lightness: 0.16
    },
    backgroundColor: {
      name: 'background',
      hue: 35,
      saturation: 0.86,
      lightness: 0.55
    }
  }

  // on change range event (and constructor - init rgb value)
  // data from Color component
  onColorChange = color => {
    const { name, valueName, value, rgb } = color

    this.setState(prevState => ({
      [`${ name }`]: {
          ...prevState[`${ name }`],
          [`${ valueName }`]: value,
          rgb
        }
    }))

    this.updateStyle(name, rgb)
  }

  updateStyle = (name, rgb) => {
    const body = document.querySelector('body')
    //const ratio = document.querySelector('.ratio')

    const color = `rgb(${ rgb.join(',') })`

    name === 'textColor' ? (
      body.style.color = color
    ) : (
      body.style.background = color
    //  ratio !== null && ( ratio.style.color = color)
    )
  }

  getContrastRatio = () => {
    const textRGB = this.state.textColor.rgb
    const bcgRGB = this.state.backgroundColor.rgb

    if (textRGB === undefined || bcgRGB === undefined) {
      return
    }

    // get luminance value
    const getLuminance = color => {
      const getSRGB = decColor => decColor / 255

      const sRGBArr = color.map(col => getSRGB(col))
      const [ R, G, B ] = sRGBArr.map(col => {
        return (col <= 0.03928) ? col / 12.92 : Math.pow(((col + 0.055) / 1.055), 2.4)
      })

      return (0.2126 * R + 0.7152 * G + 0.0722 * B)
    }

    const l1 = getLuminance(textRGB)
    const l2 = getLuminance(bcgRGB)

    const ratio = Math.round((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05) * 100) / 100

    return ratio
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="header__title">Colors Tester</h1>
        </header>

        <main className="main">
          <Color color={ this.state.textColor } onColorChange={ this.onColorChange } />

          <div className="main__ratio ratio">
            { this.getContrastRatio() }
          </div>

          <Color color={ this.state.backgroundColor } onColorChange={ this.onColorChange }/>
        </main>

        <section className="section section--description">
          <ul>
            <li>Level AAA Large</li>
            <li>Level AAA</li>
            <li>Level AA Large</li>
            <li>Level AA</li>
          </ul>
          <p>
            The latest accessibility guidelines (e.g., WCAG 2.0 1.4.3) require that text (and images of text) provide adequate contrast for people who have visual impairments. Contrast is measured using a formula that gives a ratio ranging from 1:1 (no contrast, e.g., black text on a black background) to 21:1 (maximum contrast, e.g., black text on a white background).
          </p>
          <p>
            Accessibility
          </p>
          <ul>
            <li>Level AAA Large - ratio greater than 7</li>
            <li>Level AAA - ratio greater than 4.5</li>
            <li>Level AA Large - ratio greater than 4.5 (for normal sized text)</li>
            <li>Level AA - ratio greater than 3 (for bold text or text larger than 24px)</li>
          </ul>
        </section>
      </div>
    );
  }
}

export default App;
