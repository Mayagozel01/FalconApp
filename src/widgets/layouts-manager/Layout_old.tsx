import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { ResizableBox } from "react-resizable";
import { componentsMap } from "widgets/layouts-manager/configs/layoutConfig";
import { updateLayout } from "widgets/layouts-manager/layoutsSlice";
import "./DraggableResizable.css";

type SizeType = {
  width: number;
  height: number;
};

type PositionType = {
  x: number;
  y: number;
};

export const Layout = ({ layout, index }) => {
  const dispatch = useDispatch();
  const contentRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState<SizeType>({
    width: layout.width ?? 200,
    height: layout.height ?? 200,
  });

  const [position, setPosition] = useState<PositionType>({
    x: layout.x ?? index * 50,
    y: layout.y ?? index * 50,
  });

  const sizeRef = useRef(size);
  const positionRef = useRef(position);

  useEffect(() => {
    if (contentRef.current) {
      sizeRef.current = {
        width: layout.width ?? contentRef.current.scrollWidth,
        height: layout.height ?? contentRef.current.scrollHeight,
      };
    }
  }, [layout.width, layout.height]);

  const onResizeHandler = useCallback((_, { size: newSize, handle }) => {
    window.requestAnimationFrame(() => {
      const prevSize = sizeRef.current;
      const prevPos = positionRef.current;

      let newX = prevPos.x;
      let newY = prevPos.y;

      if (handle.includes("w")) {
        newX += prevSize.width - newSize.width;
      }
      if (handle.includes("n")) {
        newY += prevSize.height - newSize.height;
      }

      sizeRef.current = newSize;
      positionRef.current = { x: newX, y: newY };

      setSize(newSize);
      setPosition({ x: newX, y: newY });
    });
  }, []);

  const onResizeStopHandler = useCallback(
    (_, { size }) => {
      dispatch(
        updateLayout({
          id: layout.id,
          width: size.width,
          height: size.height,
        })
      );
    },
    [layout.id]
  );

  const onDraggableStopHandler = useCallback(
    (_, data) => {
      const newPosition = { x: data.x, y: data.y };
      setPosition(newPosition);

      dispatch(
        updateLayout({
          id: layout.id,
          x: data.x,
          y: data.y,
        })
      );
    },
    [layout.id]
  );

  const LayoutComponent =
    componentsMap[layout.name] || (() => <div>Component not found</div>);

  return (
    <Draggable
      key={layout.id}
      bounds="parent"
      handle=".handle"
      position={position}
      onStop={onDraggableStopHandler}
    >
      <div className="draggable-container">
        <div className="handle"></div>
        <ResizableBox
          style={{ border: "1px solid black", boxSizing: "border-box" }}
          width={size.width || undefined}
          height={size.height || undefined}
          onResizeStop={onResizeStopHandler}
          onResize={onResizeHandler}
          resizeHandles={["s", "e", "w", "n", "se", "sw", "ne", "nw"]}
        >
          <div ref={contentRef} className="box-content">
            <Suspense fallback={<div>Loading...</div>}>
              <LayoutComponent {...layout} />
            </Suspense>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};
