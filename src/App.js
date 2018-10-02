import React, { Component } from 'react';
import './App.css';
import Color from './color'

class App extends Component {
  state = {
    ratio: 0,
    textColor: {
      name: 'text',
      hue: 210,
      saturation: 0.7,
      lightness: 0.25,
      rgb: []
    },
    backgroundColor: {
      name: 'background',
      hue: 210,
      saturation: 0.4,
      lightness: 0.25,
      rgb: []
    }
  }

  // on change range event - data from Color component
  onColorChange = color => {
    const { name, valueName, value, rgb } = color

    this.setState(prevState => ({
      [`${ name }`]: {
          ...prevState[`${ name }`],
          [`${ valueName }`]: value,
          rgb
        }
    }))
  }

  // get costrast ratio value
  getContrastRatio = () => {
    // get luminance: L = 0.2126 * R + 0.7152 * G + 0.0722 * B
    const getLuminance = color => {

    }

    const l1 = getLuminance(this.state.textColor.hex)
    const l2 = getLuminance(this.state.backgroundColor.hex)

    const ratio = Math.round(Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)

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

          <div className="main__ratio">
            { this.state.ratio }
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
