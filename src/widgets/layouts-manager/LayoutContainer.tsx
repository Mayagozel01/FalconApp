import FalconComponentCard from "components/common/FalconComponentCard";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { ResizableBox } from "react-resizable";
import { componentsMap } from "widgets/layouts-manager/configs/layoutConfig";
import { LAYOUT_ORDER } from "widgets/layouts-manager/constants";
import { updateLayout } from "widgets/layouts-manager/layoutsSlice";
import {
  LayoutContainerProps,
  PositionType,
  SizeType,
} from "widgets/layouts-manager/types/ui-layout";
import "./DraggableResizable.css";

export const LayoutContainer = ({ layout, index }: LayoutContainerProps) => {
  const dispatch = useDispatch();
  const contentRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);
  const isDragging = useRef(false);

  const startSize = useRef<SizeType | null>(null);
  const startPosition = useRef<PositionType | null>(null);

  const [size, setSize] = useState<SizeType>({
    width: layout.width ?? 200,
    height: layout.height ?? 200,
  });

  const [position, setPosition] = useState<PositionType>({
    x: layout.x ?? 0,
    y: layout.y ?? 0,
  });

  useEffect(() => {
    if (!isResizing.current && !isDragging.current) {
      setSize({
        width: layout.width ?? 200,
        height: layout.height ?? 200,
      });
    }
  }, [layout.width, layout.height]);

  useEffect(() => {
    if (!isResizing.current && !isDragging.current) {
      setPosition({
        x: layout.x ?? 0,
        y: layout.y ?? 0,
      });
    }
  }, [layout.x, layout.y]);

  const onResizeStart = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      isResizing.current = true;
      startSize.current = { ...size };
      startPosition.current = { ...position };

      document.body.classList.add("resizing");

      document.body.style.userSelect = "none";
    },
    [size, position]
  );

  useEffect(() => {
    const preventSelection = (e: Event) => {
      if (isResizing.current || isDragging.current) {
        e.preventDefault();
      }
    };

    document.addEventListener("selectstart", preventSelection);
    document.addEventListener("mousedown", preventSelection);

    return () => {
      document.removeEventListener("selectstart", preventSelection);
      document.removeEventListener("mousedown", preventSelection);
    };
  }, []);

  const onResizeHandler = useCallback((event, { size: newSize, handle }) => {
    if (!startSize.current || !startPosition.current) return;

    const deltaWidth = newSize.width - startSize.current.width;
    const deltaHeight = newSize.height - startSize.current.height;

    let newX = startPosition.current.x;
    let newY = startPosition.current.y;

    if (handle.includes("w")) {
      newX = startPosition.current.x - deltaWidth;
    }
    if (handle.includes("n")) {
      newY = startPosition.current.y - deltaHeight;
    }

    setSize({
      width: Math.max(100, newSize.width),
      height: Math.max(100, newSize.height),
    });

    setPosition({ x: newX, y: newY });
  }, []);

  const onResizeStopHandler = useCallback(
    (event) => {
      event.preventDefault();

      dispatch(
        updateLayout({
          id: layout.id,
          width: size.width,
          height: size.height,
          x: position.x,
          y: position.y,
        })
      );

      document.body.style.userSelect = "";

      document.body.classList.remove("resizing");

      isResizing.current = false;
      startSize.current = null;
      startPosition.current = null;
    },
    [dispatch, layout.id, size, position]
  );

  const onDragStart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    isDragging.current = true;

    document.body.style.userSelect = "none";

    document.body.classList.add("dragging");
  }, []);

  const onDragHandler = useCallback((_, data) => {
    setPosition({ x: data.x, y: data.y });
  }, []);

  const onDraggableStopHandler = useCallback(
    (e, data) => {
      e.preventDefault();

      setPosition({ x: data.x, y: data.y });

      dispatch(
        updateLayout({
          id: layout.id,
          x: data.x,
          y: data.y,
        })
      );

      document.body.style.userSelect = "";
      document.body.classList.remove("dragging");
      isDragging.current = false;
    },
    [dispatch, layout.id]
  );

  const LayoutComponent =
    componentsMap[layout.name] || (() => <div>Component not found</div>);

  if (layout.order === LAYOUT_ORDER.MAIN) {
    return (
      <div className="vh-100" style={{ display: "inline-block" }}>
        <LayoutComponent {...layout} />
      </div>
    );
  }

  return (
    <Draggable
      key={layout.id}
      bounds="parent"
      handle=".handle"
      position={position}
      onStart={onDragStart}
      onDrag={onDragHandler}
      onStop={onDraggableStopHandler}
      disabled={isResizing.current}
    >
      <div className="draggable-container">
        <FalconComponentCard multiSections={false} noGuttersBottom={false}>
          <div
            className="handle"
            style={{
              cursor: "move",
              height: "20px",
              background: "#f5f5f5",
              borderBottom: "1px solid #ddd",
              display: "flex",
              alignItems: "center",
              paddingLeft: "8px",
              fontSize: "12px",
              color: "#666",
            }}
          >
            {layout.title.value || "Window"}
          </div>
          <ResizableBox
            className="resizable-box"
            style={{
              border: "1px solid #ddd",
              boxSizing: "border-box",
              position: "relative",
            }}
            width={size.width}
            height={size.height}
            minConstraints={[100, 100]}
            onResizeStart={onResizeStart}
            onResize={onResizeHandler}
            onResizeStop={onResizeStopHandler}
            resizeHandles={["s", "e", "w", "n", "se", "sw", "ne", "nw"]}
          >
            <div
              ref={contentRef}
              className="box-content"
              style={{
                width: "100%",
                height: "100%",
                overflow: "auto",
                padding: "8px",
              }}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <LayoutComponent {...layout} />
              </Suspense>
            </div>
          </ResizableBox>
        </FalconComponentCard>
      </div>
    </Draggable>
  );
};
