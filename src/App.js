import React, { Component } from 'react';
import './App.scss';
import Color from './color'
import { rgbToHex, getContrastRatio } from './colorHelpers'

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
      [name]: {
          ...prevState[name],
          [valueName]: value,
          rgb
        }
    }),
      () => {
        // execute this functions after the state changes occurs
        this.updateStyle(name, rgb)
        this.setState({
          ratio: getContrastRatio(this.state.backgroundColor.rgb, this.state.textColor.rgb)
        })
      }
    )
  }

  updateStyle = (name, rgb) => {
    const body = document.querySelector('body')
//    const ratio = document.querySelector('.ratio')
//    console.log(ratio !== null)
    const color = rgbToHex(rgb)

    name === 'textColor' ? (
      body.style.color = color
    ) : (
      body.style.background = color
    //  ratio !== null && ( ratio.style.color = color)
    )
  }

  render () {
    return (
      <div className="app">
        <header className="header">
          <h1 className="header__title">Colors Tester</h1>
        </header>

        <main className="main">
          <Color color={ this.state.textColor } onColorChange={ this.onColorChange } />

          <div className="main__ratio ratio">
            { this.state.ratio }
          </div>
          <Color color={ this.state.backgroundColor } onColorChange={ this.onColorChange }/>
        </main>

        <section className="section section--description">
          <div className="description description--left">
            {/* conditional rendering depend on ratio value */}
            <ul className="description__list">
              { this.state.ratio > 3 ? 'Passed:' : 'Failed!' }
              { this.state.ratio > 3 &&
                <li className="description__listItem">AAA Large</li>
              }
              { this.state.ratio > 4.5 &&
                <li className="description__listItem">AAA</li>
              }
              { this.state.ratio > 4.5 &&
                <li className="description__listItem">AA Large</li>
              }
              { this.state.ratio > 7 &&
                <li className="description__listItem">AA</li>
              }
            </ul>
            <a className="description__icon" href="https://github.com/Hobbytowo/Colors-Tester">
              <span className="fab fa-github"></span>
            </a>
          </div>

          <div className="description description--right">
            <p className="description__par par">
              <a className="description__link" href="https://www.w3.org/TR/WCAG20/#visual-audio-contrast">
                WCAG - Visual Contrast
              </a>
            </p>
            <p className="description__par">
              The latest accessibility guidelines (e.g., WCAG 2.0 1.4.3) require that text (and images of text) provide adequate contrast for people who have visual impairments. Contrast is measured using a formula that gives a ratio ranging from 1:1 (no contrast, e.g., black text on a black background) to 21:1 (maximum contrast, e.g., black text on a white background).
            </p>
            <p className="description__par">
              Decorative elements or text that is part of a logo or brand name have no minimum contrast requirements.
            </p>
            <p className="description__par par par--title">
              Accessibility:
            </p>
            <ul className="description__list">
              <li className="description__listItem">
                Level AA Large - ratio greater than 3 (for minimum 24px or 18.5px bold text)
              </li>
              <li className="description__listItem">
                Level AA - ratio greater than 4.5 (for normal text sized below ~18px)
              </li>
              <li className="description__listItem">
                Level AAA Large - ratio greater than 4.5 (for minimum 24px or 18.5px bold text)
              </li>
              <li className="description__listItem">
                Level AAA - ratio greater than 7 (for normal text sized below ~18px)
              </li>
            </ul>
            <p className="description__par par par--aaa">
              Level AAA is for text which will be read for a significant period of time.
            </p>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
