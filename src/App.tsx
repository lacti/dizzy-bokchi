import * as React from "react";
import * as R from "rambda";
import "./App.css";

import { defineCharacter2x } from "./components/Character";
import * as assets from "./assets";
import { defineAsset2x } from "./components/Asset";
import BackgroundTree from "./BackgroundTree";
import Message from "./components/Message";
import Button from "./components/Button";

const House = defineAsset2x(assets.houses);
const Player = defineCharacter2x(assets.players);

enum GameState {
  Intro,
  GameWalking,
  GameStand,
  GameHouseAppeared,
  GameSelectionChoosed,
  GameResultApplied,
  End
}

interface AppState {
  state: GameState;

  // GameStand
  opacity: number;
  houseIndex: number;
  message?: string;
}

const sleep = (millis: number) =>
  new Promise<void>(resolve => window.setTimeout(resolve, millis));

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      state: GameState.Intro,
      opacity: 0,
      houseIndex: 0
    };
  }

  public componentDidMount() {
    this.gameLoop();
  }

  public render() {
    const { state, opacity, houseIndex, message } = this.state;
    return (
      <div className="App">
        {message && <Message text={message} />}
        <BackgroundTree moving={state === GameState.GameWalking} />
        <House
          index={houseIndex}
          position={{ right: 32, bottom: 108 }}
          opacity={opacity}
        />
        <Player
          index={0}
          animationDelay={state === GameState.GameWalking ? 150 : 0}
          position={{ right: 48, bottom: 48 }}
        />
        <React.Fragment>
          <Button
            position={{ left: 24, bottom: 24 }}
            padding={20}
            image={assets.icons.restaurant}
            opacity={0.7}
            onClick={this.onEatIt}
          />
          <Button
            position={{ left: 116, bottom: 24 }}
            padding={18}
            image={assets.icons.runner}
            opacity={0.7}
            onClick={this.onRunAway}
          />
        </React.Fragment>
      </div>
    );
  }

  private gameLoop = async () => {
    while (true) {
      this.setState({
        state: GameState.GameWalking,
        opacity: 0
      });
      await sleep(2000);
      this.setState({
        state: GameState.GameStand,
        houseIndex: Math.floor(Math.random() * assets.houses.length)
      });
      for (const level of R.range(1, 5)) {
        this.setState({
          opacity: (level * 2) / 10
        });
        await sleep(100);
      }
      this.setState({
        state: GameState.GameHouseAppeared,
        opacity: 1
      });
      await sleep(1000);
      this.setState({
        state: GameState.GameResultApplied
      });
      for (const level of R.range(1, 5)) {
        this.setState({
          opacity: (10 - level * 2) / 10
        });
        await sleep(100);
      }
    }
  };

  private onEatIt = () => this.setMessageText("먹었다!");
  private onRunAway = () => this.setMessageText("안먹어!");

  private setMessageText = async (message: string, millis: number = 2000) => {
    this.setState({
      message
    });
    await sleep(millis);
    if (this.state.message === message) {
      this.setState({ message: undefined });
    }
  };
}

export default App;
