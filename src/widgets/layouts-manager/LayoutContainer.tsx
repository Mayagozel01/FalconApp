import { MainLayout } from "entities/layouts/MainLayout";
import { Suspense } from "react";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { Resizable } from "react-resizable";
import { componentsMap } from "widgets/layouts-manager/configs/layoutConfig";
import { LAYOUT_ORDER } from "widgets/layouts-manager/constants";
import { updateLayout } from "widgets/layouts-manager/layoutsSlice";
import { UILayout } from "widgets/layouts-manager/types/ui-layout";
import "./DraggableResizable.css";

type LayoutProps = {
  layout: UILayout;
  index: number;
};

export const LayoutContainer = ({ layout, index }: LayoutProps) => {
  const dispatch = useDispatch();

  const onResizeHandler = (_, { size }) => {
    if (size.width !== layout.width || size.height !== layout.height) {
      console.log(size);
      dispatch(
        updateLayout({
          id: layout.id,
          width: size.width,
          height: size.height,
        })
      );
    }
  };

  const LayoutComponent =
    componentsMap[layout.name] || (() => <div>Component not found</div>);

  if (layout.order === LAYOUT_ORDER.MAIN) {
    return (
      <MainLayout>
        <LayoutComponent {...layout} />
      </MainLayout>
    );
  }

  return (
    <Draggable handle=".handle" key={layout.id}>
      <div style={{ display: "inline-block" }}>
        <div className="handle"></div>
        <Resizable
          width={layout.width || 200}
          height={layout.height || 900}
          onResize={onResizeHandler}
          resizeHandles={["s", "e", "w", "n"]}
        >
          <div
            style={{
              width: `${layout.width || 900}px`,
              height: `${layout.height || 900}px`,
              border: "1px solid black",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <LayoutComponent {...layout} />
            </Suspense>
          </div>
        </Resizable>
      </div>
    </Draggable>
  );
};
