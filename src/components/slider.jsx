import { useState, useRef, useEffect } from "react";
import "../styles/components/slider.css";

function CustomSlider({ min = 0, max = 100, step = 1, value, onChange }) {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const updateValue = (clientX) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const newValue = min + percent * (max - min);
    onChange(parseFloat(newValue.toFixed(2)));
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) updateValue(e.clientX);
    };
    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={sliderRef}
      className="custom-slider"
      onMouseDown={(e) => {
        setIsDragging(true);
        updateValue(e.clientX);
      }}
    >
      <div
        className="slider-track"
        style={{
          background: `linear-gradient(to right, var(--color-primary1) ${(value / max) * 100}%, var(--color-clair) ${(value / max) * 100}%)`,
        }}
      />
      <div
        className={`slider-thumb ${isDragging ? "dragging" : ""}`}
        style={{
          left: `${(value / max) * 100}%`,
        }}
      />
    </div>
  );
}

export default CustomSlider;
