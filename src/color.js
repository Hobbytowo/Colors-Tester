import React, { Component } from 'react';

class Color extends Component {

  onColorChange = e => {
    const [ valueName, name ] = e.target.name.split('-')
    const value = e.target.value * 1
    this.props.onColorChange({name: name + 'Color', valueName: valueName, value: value})
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
            <input className="form__input" id={ `${ name }Color` } type="text" placeholder="#333"/>
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
