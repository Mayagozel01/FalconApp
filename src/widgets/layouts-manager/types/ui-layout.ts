import { Layout } from "entities/layouts/types/layout";

export type UILayout = Layout & {
  id: string;

  width: number;
  height: number;
  x: number;
  y: number;
};

export type SizeType = {
  width: number;
  height: number;
};

export type PositionType = {
  x: number;
  y: number;
};

export type LayoutProps = {
  id: string;
  name: string;
  order: string;
  width?: number;
  height?: number;
  x: number;
  y: number;
  [key: string]: any;
};

export type LayoutContainerProps = {
  layout: LayoutProps;
  index: number;
};
