import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { HuePicker, SketchPicker } from "react-color";

function Expand() {
  const location = useLocation();
  const todo = location.state?.todo;
  const [boxes, setBoxes] = useState([]);
  const [activeColorPicker, setActiveColorPicker] = useState(null);
  const navigate = useNavigate();
  const textareaRef = useRef(null);

  const resizeTextArea = () => {
    const textArea = textareaRef.current;
    if (textArea) {
      textArea.style.height = "auto";
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resizeTextArea();
  }, []);

  const handleClick = (e) => {
    if (e.target.tagName === "INPUT") return;

    if (activeColorPicker !== null) {
      setActiveColorPicker(null);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setBoxes((prev) => [
      ...prev,
      {
        x,
        y,
        id: Date.now(),
        value: "",
        backgroundColor: "transparent",
      },
    ]);
  };

  const handleInput = (id, val) => {
    setBoxes((prev) =>
      prev.map((box) => (box.id === id ? { ...box, value: val } : box))
    );
  };

  const handleButtonClick = () => {
    console.log("going back");
    localStorage.setItem(`boxes/${todo.id}`, JSON.stringify(boxes));
    navigate("/");
  };

  const handleRightClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent parent events
    setActiveColorPicker(id);
  };

  const handleColorChange = (color, id) => {
    setBoxes((prev) =>
      prev.map((box) =>
        box.id === id ? { ...box, backgroundColor: color.hex } : box
      )
    );
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".color-picker-container")) {
      setActiveColorPicker(null);
    }
  };

  useEffect(() => {
    // Add click event listener to close color picker when clicking outside
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const savedBoxes = localStorage.getItem(`boxes/${todo.id}`);
    if (savedBoxes) setBoxes(JSON.parse(savedBoxes));
  }, [todo?.id]);

  const handleDragStart = (e, id) => {
    setActiveColorPicker(null);

    const draggedBox = boxes.find((box) => box.id === id);
    if (draggedBox) {
      e.dataTransfer.setData("boxId", id.toString());
      const rect = e.target.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      e.dataTransfer.setData("offsetX", offsetX);
      e.dataTransfer.setData("offsetY", offsetY);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const boxId = parseInt(e.dataTransfer.getData("boxId"));
    const offsetX = parseFloat(e.dataTransfer.getData("offsetX")) || 0;
    const offsetY = parseFloat(e.dataTransfer.getData("offsetY")) || 0;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - offsetX;
    const y = e.clientY - rect.top - offsetY;

    setBoxes((prev) =>
      prev.map((box) => (box.id === boxId ? { ...box, x, y } : box))
    );
  };

  return (
    <>
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="relative w-screen h-screen bg-blue-950 cursor-crosshair overflow-hidden"
      >
        {boxes.map((box) => (
          <div
            key={box.id}
            draggable
            onDragStart={(e) => handleDragStart(e, box.id)}
            className="absolute cursor-move"
            style={{
              left: `${box.x}px`,
              top: `${box.y}px`,
            }}
          >
            <textarea
              ref={textareaRef}
              value={box.value}
              type="text"
              placeholder="Type here...."
              autoFocus
              onChange={(e) => {
                resizeTextArea();
                handleInput(box.id, e.target.value);
              }}
              className="px-3 py-1 rounded border border-amber-300 text-white"
              style={{ backgroundColor: box.backgroundColor }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.target.blur();
                }
              }}
              onClick={(e) => e.stopPropagation()}
              onContextMenu={(e) => handleRightClick(e, box.id)}
            />

            {activeColorPicker === box.id && (
              <div
                className="absolute mt-2 z-10 color-picker-container"
                onClick={(e) => e.stopPropagation()}
              >
                <SketchPicker
                  color={box.backgroundColor || "#ffffff"}
                  onChange={(color) => handleColorChange(color, box.id)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleButtonClick}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 border rounded-2xl text-white border-amber-50 px-2 py-1 z-50"
      >
        Go Back
      </button>
    </>
  );
}

export default Expand;
