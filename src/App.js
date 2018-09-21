import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    ratio: 0
  }

  colorChange = () => {
    console.log(this.state)
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="header__title">Colors Tester</h1>
        </header>

        <main className="main">
          <article className="main__article article article--text">
            <form className="article__form form">
              <label className="form__label" htmlFor="textColorInput">Text:</label>
              <input className="form__input" id="textColorInput" type="text" placeholder="#333"/>
            </form>
          </article>

          <div className="main__ratio">
            { this.state.ratio }
          </div>

          <article className="main__article article article--background">
            <form className="article__form form">
              <label className="form__label" htmlFor="backgroundColorInput">Background:</label>
              <input className="form__input" id="backgroundColorInput" type="text" placeholder="#333"/>
            </form>
          </article>
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
          <p>
          <ul>
            <li>Level AAA Large - ratio greater than 7</li>
            <li>Level AAA - ratio greater than 4.5</li>
            <li>Level AA Large - ratio greater than 4.5 (for normal sized text)</li>
            <li>Level AA - ratio greater than 3 (for bold text or text larger than 24px)</li>
          </ul>
          </p>
        </section>
      </div>
    );
  }
}

export default App;
