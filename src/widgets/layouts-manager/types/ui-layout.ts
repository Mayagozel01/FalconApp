import { Layout } from "entities/layouts/types/layout";

export type UILayout = Layout & {
  id: string;
  
  width: number;
  height: number;
  x: number;
  y: number;
};
