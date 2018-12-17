import * as React from "react";
import * as R from "rambda";
import { IPosition, ISize, ISprites } from "../types";

interface CharacterRequiredProps {
  sprites: ISprites;
  animationDelay?: number;
  position: IPosition;
  opacity?: number;
}

interface CharacterProps extends CharacterRequiredProps {
  size?: ISize;
}

interface CharacterState {
  spriteIndex: number;
}

export default class Character extends React.Component<
  CharacterProps,
  CharacterState
> {
  private animateTimer: number;

  constructor(props: CharacterProps) {
    super(props);
    this.state = { spriteIndex: 0 };
    this.animateTimer = 0;
  }

  public componentDidMount() {
    this.startTimer();
  }

  public componentDidUpdate() {
    this.clearTimer();
    this.startTimer();
  }

  public componentWillUnmount() {
    this.clearTimer();
  }

  public render() {
    const { sprites, size, position } = this.props;
    const { spriteIndex } = this.state;
    const imageStyle: React.CSSProperties = {
      position: "absolute",
      ...(size || { width: sprites.width, height: sprites.height }),
      ...(position || {})
    };
    return (
      <img
        src={sprites.images[spriteIndex]}
        style={imageStyle}
        draggable={false}
      />
    );
  }

  private startTimer = () => {
    const { animationDelay } = this.props;
    if (animationDelay) {
      this.animateTimer = window.setInterval(this.onNextSprite, animationDelay);
    }
  };

  public clearTimer = () => {
    if (this.animateTimer != 0) {
      window.clearInterval(this.animateTimer);
    }
  };

  private onNextSprite = () => {
    const { sprites } = this.props;
    const { spriteIndex } = this.state;
    this.setState({
      spriteIndex: (spriteIndex + 1) % sprites.images.length
    });
  };
}

const Character2x: React.SFC<CharacterRequiredProps> = props => (
  <Character
    {...props}
    size={{
      width: props.sprites.width * 2,
      height: props.sprites.height * 2
    }}
  />
);

export const defineCharacter2x = (collectionOfSprites: ISprites[]) => {
  const defined: React.SFC<
    R.Omit<CharacterRequiredProps, "sprites"> & { index: number }
  > = props => (
    <Character2x {...props} sprites={collectionOfSprites[props.index]} />
  );
  return defined;
};
