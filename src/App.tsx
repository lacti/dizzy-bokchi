import React, { Component } from "react";
import "./App.css";

import Character from "./components/Character";
import { characterSprites } from "./assets";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Character
          animationDelay={250}
          sprites={characterSprites}
          size={{ width: 240, height: 320 }}
        />
      </div>
    );
  }
}

export default App;
