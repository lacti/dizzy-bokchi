import * as React from "react";
import { IPosition, ISize } from "../types";

interface ButtonProps {
  position: IPosition;
  padding?: number;
  size?: ISize;
  image?: string;
  text?: string;
  opacity?: number;
  onClick?: () => void;
}

const Button: React.SFC<ButtonProps> = ({
  position,
  padding,
  size,
  image,
  text,
  opacity,
  onClick
}) => (
  <div
    style={{
      position: "absolute",
      ...position,
      ...(size || {}),
      padding: !size ? padding : undefined,
      backgroundColor: "#cccccc",
      borderColor: "#333333",
      opacity: opacity,
      borderStyle: "solid",
      borderWidth: "2px",
      borderRadius: "50%"
    }}
    onClick={onClick}
    onTouchStart={onClick}
  >
    {image && <img src={image} />}
    {text}
  </div>
);

export default Button;
