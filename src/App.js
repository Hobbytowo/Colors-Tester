import React, { Component } from 'react'
import './App.scss'
import Color from './color'
import { hslToRgb, rgbToHex, getContrastRatio } from './colorHelpers'
import { getFavicon } from './favicon'

class App extends Component {
  state = {
    textColor: {
      name: 'text',
      hue: 201,
      saturation: 0.72,
      lightness: 0.16
    },
    backgroundColor: {
      name: 'background',
      hue: 222,
      saturation: 0.1,
      lightness: 0.76
    }
  }

  // create references to Color components
  // get initial values
  constructor (props) {
    super(props)
    this.textColorChild = React.createRef()
    this.backgroundColorChild = React.createRef()

    const rgbText = this.getRGB('textColor')
    const rgbBcg = this.getRGB('backgroundColor')
    this.state.textColor.rgb = rgbText
    this.state.backgroundColor.rgb = rgbBcg

    // initial ratio value
    this.state.ratio = getContrastRatio(rgbText, rgbBcg)

    // initial FAVICON
    getFavicon(rgbText, rgbBcg)
  }

  componentDidMount () {
    const rgbText = this.state.textColor.rgb
    const rgbBcg = this.state.backgroundColor.rgb

    // initial backround and text style
    this.updateStyle('textColor', rgbText)
    this.updateStyle('backgroundColor', rgbBcg)

    // initial hexa colorPicker value
    this.textColorChild.current.updateHexaValues(rgbText)
    this.backgroundColorChild.current.updateHexaValues(rgbBcg)
  }

  getRGB = name => {
    const { hue, saturation, lightness } = this.state[name]
    return hslToRgb(hue, saturation, lightness)
  }

  /* on change range event (and constructor - init rgb value)
  data from Color component */
  onColorChange = color => {
    const { name, changedValueName, changedValue } = color

    this.setState(prevState => ({
      [name]: {
          ...prevState[name],
          [changedValueName]: changedValue
        }
    }),
      () => {
        // execute this functions after the state changes occurs

        // get rgb value and update background and text color style
        const rgb = this.getRGB(name)
        this.updateStyle(name, rgb)

        // get ratio value and update hexa colorPicker value
        let rgb2 = 0

        if ( name === 'textColor') { // if textColor was changed
          rgb2 = this.state.backgroundColor.rgb
          this.textColorChild.current.updateHexaValues(rgb)
          getFavicon(rgb, rgb2)
        } else { // if backgroundColor was changed
          rgb2 = this.state.textColor.rgb
          this.backgroundColorChild.current.updateHexaValues(rgb)
          getFavicon(rgb2, rgb)
        }

        const ratio = getContrastRatio(rgb, rgb2)
        this.setState(prevState => ({
          ratio,
          [name]: {
              ...prevState[name],
              rgb
            }
        }))
      }
    )
  }

  updateStyle = (name, rgb) => {
    const body = document.querySelector('body')
    const ratio = document.querySelector('.ratio')
    const btns = document.querySelectorAll('.button')
    const link = document.querySelector('.description__link')

    const color = rgbToHex(rgb)

    if (name === 'textColor') {
      // when text color was changed
      body.style.color = color
      link.style.color = color
      ratio.style.background = color
      btns.forEach(btn => {
        btn.style.background = color
      })
    } else { // when background color was changed
      body.style.background = color
      ratio.style.color = color
      btns.forEach(btn => {
        btn.style.color = color
      })
    }
  }

  // swap background color and text color onClick event
  swapColors = () => {
    // swap h, s, l values
    this.setState(prevState => ({
      textColor: {
        ...prevState.textColor,
        hue: this.state.backgroundColor.hue,
        saturation: this.state.backgroundColor.saturation,
        lightness: this.state.backgroundColor.lightness,
        rgb: this.state.backgroundColor.rgb
      },
      backgroundColor: {
        ...prevState.backgroundColor,
        hue: this.state.textColor.hue,
        saturation: this.state.textColor.saturation,
        lightness: this.state.textColor.lightness,
        rgb: this.state.textColor.rgb
      }
    }),
      () => {
        // execute after the state changes occurs

        // update favicon
        getFavicon(this.state.textColor.rgb, this.state.backgroundColor.rgb)

        // change background and text style color
        this.updateStyle('textColor', this.state.textColor.rgb)
        this.updateStyle('backgroundColor', this.state.backgroundColor.rgb)

        // swap hexa values for colorPickers
        this.textColorChild.current.updateHexaValues(this.state.textColor.rgb)
        this.backgroundColorChild.current.updateHexaValues(this.state.backgroundColor.rgb)
      }
    )
  }

  getRandomColors = () => {
    // get random h, s, l values
    this.setState(prevState => ({
      textColor: {
        ...prevState.textColor,
        hue: Math.round(Math.random() * 360),
        saturation: Math.round(Math.random() * 100) / 100,
        lightness: Math.round(Math.random() * 100) / 100
      },
      backgroundColor: {
        ...prevState.backgroundColor,
        hue: Math.round(Math.random() * 360),
        saturation: Math.round(Math.random() * 100) / 100,
        lightness: Math.round(Math.random() * 100) / 100
      }
    }),
      () => {
        // get rgb values after the state changes above occurs
        const textRGB = hslToRgb(
          this.state.textColor.hue,
          this.state.textColor.saturation,
          this.state.textColor.lightness
        )

        const bcgRGB = hslToRgb(
          this.state.backgroundColor.hue,
          this.state.backgroundColor.saturation,
          this.state.backgroundColor.lightness
        )

        this.setState(prevState => ({
          textColor: {
            ...prevState.textColor,
            rgb: textRGB
          },
          backgroundColor: {
            ...prevState.backgroundColor,
            rgb: bcgRGB
          }
        }))

        // change background and text style color
        this.updateStyle('textColor', textRGB)
        this.updateStyle('backgroundColor', bcgRGB)

        // update hexa values for colorPickers
        this.textColorChild.current.updateHexaValues(textRGB)
        this.backgroundColorChild.current.updateHexaValues(bcgRGB)

        // update favicon
        getFavicon(textRGB, bcgRGB)

        // update ratio value
        this.setState({
          ratio: getContrastRatio(bcgRGB, textRGB)
        })
      }
    )
  }

  onColorPickerChange = color => {
    const { name, hsl, rgb } = color
    const [ hue, saturation, lightness ] = hsl

    this.setState(prevState => ({
      [name]: {
          ...prevState[name],
          hue: Math.round(hue),
          saturation: Math.round(saturation * 100) / 100,
          lightness: Math.round(lightness * 100) / 100,
          rgb
        }
    }),
      () => {
        // execute after the state changes occurs
        getFavicon(this.state.textColor.rgb, this.state.backgroundColor.rgb)
        this.updateStyle(name, rgb)
        this.setState({
          ratio: getContrastRatio(this.state.backgroundColor.rgb, this.state.textColor.rgb)
        })
      }
    )
  }


  render () {
    return (
      <div className="app">
        <header className="header">
          <h1 className="header__title">Colors Tester</h1>
        </header>

        <main className="main">
          <Color
            color={ this.state.textColor }
            onColorChange={ this.onColorChange }
            onColorPickerChange={ this.onColorPickerChange }
            ref={ this.textColorChild }
          />

          <div className="main__ratio ratio">
            { this.state.ratio }
          </div>

          <Color
            color={ this.state.backgroundColor }
            onColorChange={ this.onColorChange }
            onColorPickerChange={ this.onColorPickerChange }
            ref={ this.backgroundColorChild }
          />
        </main>

        <section className="section section--description description">
          <div className="description--left">
            <div className="description__passedList">
              {/* conditional rendering depend on ratio value */}
              <span className="list__title">
              { this.state.ratio > 3 ? 'Passed:' : 'Failed' }
              </span>
              <ul className="description__list list">
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
            </div>
            <a className="description__icon" href="https://github.com/Hobbytowo/Colors-Tester">
              <span className="fab fa-github"></span>
            </a>
          </div>

          <div className="description--right">
            <div className="description__buttons">
              <button onClick={ this.swapColors } className="button button--swap">
                Reverse colors
              </button>
              <button onClick={ this.getRandomColors } className="button button--random">
                Random colors
              </button>
            </div>

            <p className="description__par par par--title">
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
            <p className="description__par par par--aboutAAA">
              Level AAA is for text which will be read for a significant period of time.
            </p>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
