import { Layout } from "entities/layouts/types/layout";

export type UILayout = Layout & {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
};
