import { Suspense } from "react";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { Resizable } from "react-resizable";
import { componentsMap } from "widgets/layouts-manager/configs/layoutConfig";
import { LAYOUT_ORDER } from "widgets/layouts-manager/constants";
import { updateLayout,toggleLayoutActive} from "widgets/layouts-manager/layoutsSlice";
import { UILayout } from "widgets/layouts-manager/types/ui-layout";
import "./DraggableResizable.css";


type LayoutProps = {
  layout: UILayout;
  index: number;
};

export const LayoutContainer = ({ layout, index }: LayoutProps) => {
  const dispatch = useDispatch();

  const isActive = useSelector((state: any) =>
  state.layouts.layouts.find((l: UILayout) => l.id === layout.id)?.isActive
);

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
  const handleSetActive = () => {
    dispatch(toggleLayoutActive(layout.id));
  };


  const LayoutComponent =
    componentsMap[layout.name] || (() => <div>Component not found</div>);

  const handleStyle = {
    padding: "10px",
    cursor: "move",
    backgroundColor: isActive ? "rgb(44, 123, 229)" : "lightgray", // Default light gray
    color: isActive ? "white" : "black", // Optional: Adjust text color
  };


  if (layout.order === LAYOUT_ORDER.MAIN) {
    return (
      <div className="vh-100" style={{display:"inline-block"}}>
        <LayoutComponent {...layout} />
  </div>
    );
  }

  return (
    <Draggable handle=".handle" key={layout.id}
    defaultPosition={{ x: 20, y:0 }} >
    <div style={{ display: "inline-block" }} className="m-2">
      <div className="handle" style={handleStyle}
       onClick={handleSetActive}
      >
      </div>
      <Resizable
        width={layout.width || 200}
        height={layout.height || 500}
        onResize={onResizeHandler}
        resizeHandles={["s", "e", "w", "n"]}
      >
        <div
          className="draggable-resizable-container"
          style={{
            width: `${layout.width || 900}px`,
            height: `${layout.height || 500}px`,
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
