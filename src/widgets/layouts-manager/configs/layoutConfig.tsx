import React, { lazy } from "react";
import { UILayout } from "widgets/layouts-manager/types/ui-layout";

export const componentsMap: Record<
  string,
  React.LazyExoticComponent<React.FC<UILayout | any>>
> = {
  Card: lazy(() => import("entities/layouts/Table/Table")),
  Permission: lazy(() => import("entities/layouts/List")),
  Registry: lazy(() => import("entities/layouts/Registry")),
  ClickedCellComponent: lazy(
    () => import("entities/layouts/ClickedCellComponent")
  ),
  EditingCellComponent: lazy(
    () => import("entities/layouts/EditingCellComponent")
  ),
};
