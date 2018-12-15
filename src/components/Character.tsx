import * as React from "react";

interface CharacterProps {
  sprites: string[];
  animationDelay: number;
  size?: {
    width: number;
    height: number;
  };
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
    const { animationDelay } = this.props;
    if (animationDelay > 0) {
      this.animateTimer = window.setInterval(this.onNextSprite, animationDelay);
    }
  }

  public componentWillUnmount() {
    if (this.animateTimer != 0) {
      window.clearInterval(this.animateTimer);
    }
  }

  public render() {
    const { sprites, size } = this.props;
    const { spriteIndex } = this.state;
    const imageStyle = size
      ? {
          ...size
        }
      : {};
    return <img src={sprites[spriteIndex]} style={imageStyle} />;
  }

  private onNextSprite = () => {
    const { sprites } = this.props;
    const { spriteIndex } = this.state;
    this.setState({
      spriteIndex: (spriteIndex + 1) % sprites.length
    });
  };
}
