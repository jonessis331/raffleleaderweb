import React, { useRef, useState } from "react";
import { useDrop } from "react-dnd";
import CanvasItem from "./CanvasItem";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "../styles/Canvas.css";

const Canvas = ({
  items,
  setItems,
  setSelectedItem,
  selectedItem,
  raffleWidth,
  backgroundColor,
}) => {
  const [transformState, setTransformState] = useState({
    scale: 1,
    positionX: 0,
    positionY: 0,
  });

  const canvasRef = useRef(null);

  const [isItemDragging, setIsItemDragging] = useState(false);

  const [, dropRef] = useDrop(
    () => ({
      accept: "item",
      drop: (item, monitor) => {
        const clientOffset = monitor.getClientOffset();
        if (!clientOffset) return;

        const canvasElement = canvasRef.current;
        if (!canvasElement) return;

        const canvasRect = canvasElement.getBoundingClientRect();

        const { scale, positionX, positionY } = transformState;

        // Calculate the position within the canvas
        const xOnCanvas =
          (clientOffset.x - canvasRect.left - positionX) / scale;
        const yOnCanvas = (clientOffset.y - canvasRect.top - positionY) / scale;

        const newItem = {
          id: `${item.type}-${Date.now()}`,
          type: item.type,
          x: xOnCanvas,
          y: yOnCanvas,
          width: 100,
          height: 100,
          zIndex: items.length,
          props: getDefaultProps(item.type),
        };

        setItems((prevItems) => [...prevItems, newItem]);
      },
    }),
    [items, transformState]
  );

  return (
    <div className="canvas-scroll-container">
      <div className="freeboard">
        <TransformWrapper
          wheel={{ step: 0.1 }}
          panning={{ disabled: isItemDragging }}
          doubleClick={{ disabled: true }}
          minScale={0.1}
          maxScale={2}
          onZoomStop={(ref) => {
            setTransformState(ref.state);
          }}
          onPanningStop={(ref) => {
            setTransformState(ref.state);
          }}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <>
              {/* Zoom Controls */}
              <div className="zoom-controls">
                <button onClick={() => zoomIn()}>+</button>
                <button onClick={() => zoomOut()}>-</button>
                <button onClick={() => resetTransform()}>Reset</button>
              </div>
              <TransformComponent
                wrapperStyle={{
                  width: "100%",
                  height: "100%",
                }}
                contentStyle={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  id="canvas"
                  ref={(el) => {
                    dropRef(el);
                    canvasRef.current = el;
                  }}
                  className="canvas"
                  style={{
                    width: `${raffleWidth}px`,
                    height: "800px",
                    backgroundColor,
                    position: "relative",
                  }}
                >
                  {items.map((item) => (
                    <CanvasItem
                      key={item.id}
                      item={item}
                      setItems={setItems}
                      setSelectedItem={setSelectedItem}
                      isSelected={selectedItem?.id === item.id}
                      setIsItemDragging={setIsItemDragging}
                    />
                  ))}
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
};

const getDefaultProps = (type) => {
  switch (type) {
    case "text":
      return {
        content: "Sample Text",
        fontSize: 16,
        color: "#000000",
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "",
        fontFamily: "Arial",
        letterSpacing: 0,
        lineHeight: 20,
        textAlign: "left",
        verticalAlign: "top",
        textOrientation: "horizontal", // Default orientation
      };
    case "entry":
      return { entryType: "facebook" };
    case "counter":
      return { endDate: new Date(Date.now() + 86400000).getTime() };
    case "image":
      return { src: "https://via.placeholder.com/150" };
    default:
      return {};
  }
};

export default Canvas;
