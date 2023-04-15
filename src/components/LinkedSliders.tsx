// components/LinkedSliders.tsx

import React from "react";

interface LinkedSlidersProps {
  maxValue: number;
  sliderValue1: number;
  sliderValue2: number;
  onSlider1Change: (value: number) => void;
  onSlider2Change: (value: number) => void;
}

const LinkedSliders: React.FC<LinkedSlidersProps> = ({
  maxValue,
  sliderValue1,
  sliderValue2,
  onSlider1Change,
  onSlider2Change,
}) => {
  const handleSlider1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    onSlider1Change(value);
  };

  const handleSlider2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    onSlider2Change(value);
  };

  return (
    <div>
      <input type="range" min="0" max={maxValue} value={sliderValue1} onChange={handleSlider1Change} />
      <input type="range" min="0" max={maxValue} value={sliderValue2} onChange={handleSlider2Change} />
    </div>
  );
};

export default LinkedSliders;
