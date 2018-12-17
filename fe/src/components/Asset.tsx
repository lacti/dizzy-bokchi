import * as React from "react";
import * as R from "rambda";
import { IPosition, ISize, IAsset } from "../types";

interface AssetRequiredProps {
  asset: IAsset;
  position: IPosition;
  opacity?: number;
}

interface AssetProps extends AssetRequiredProps {
  size?: ISize;
}

export default class Asset extends React.Component<AssetProps> {
  public render() {
    const { asset, size, position, opacity } = this.props;
    const imageStyle: React.CSSProperties = {
      position: "absolute",
      opacity: opacity === undefined ? 1 : opacity,
      ...(size || { width: asset.width, height: asset.height }),
      ...(position || {})
    };
    return <img src={asset.image} style={imageStyle} draggable={false} />;
  }
}

export const Asset2x: React.SFC<AssetRequiredProps> = props => (
  <Asset
    {...props}
    size={{
      width: props.asset.width * 2,
      height: props.asset.height * 2
    }}
  />
);

export const defineAsset2x = (assets: IAsset[]) => {
  const defined: React.SFC<
    R.Omit<AssetRequiredProps, "asset"> & { index: number }
  > = props => <Asset2x {...props} asset={assets[props.index]} />;
  return defined;
};
