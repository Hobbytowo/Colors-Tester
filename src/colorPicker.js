import React, { Component } from 'react'
import { ChromePicker } from 'react-color'
import './colorPicker.scss'

class ColorPicker extends Component {
  state = {
    displayColorPicker: false
  }

  handleClick = () => {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker
    })
  }

  handleClose = () => {
    this.setState({
      displayColorPicker: false
    })
  }

  handleChange = color => {

    this.props.onColorPickerChange({
      name: this.props.name,
      hex: color.hex,
      hsl: color.hsl,
      rgb: color.rgb
    })
  }

  render() {
    const hex = this.props.hex

    return (
      <div>
        <div className="swatch" onClick={ this.handleClick }>
          <div className="color" style={{ background: hex }} />
        </div>
        { this.state.displayColorPicker
          ?
          <div className="popover">
            <div className="cover" onClick={ this.handleClose }/>
            <ChromePicker
              disableAlpha
              color={ hex }
              onChange={ this.handleChange }
            />
          </div>
          : null
        }
      </div>
    )
  }
}

export default ColorPicker
