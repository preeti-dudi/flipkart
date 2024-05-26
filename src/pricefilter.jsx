import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const PriceFilter = ({ onFilter }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(25000);

  const handleSliderChange = (value) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  const handleMinPriceChange = (e) => {
    const newMinPrice = Number(e.target.value);
    setMinPrice(newMinPrice);
    setMaxPrice((prevMaxPrice) => Math.max(newMinPrice, prevMaxPrice));
  };

  const handleMaxPriceChange = (e) => {
    const newMaxPrice = Number(e.target.value);
    setMaxPrice(newMaxPrice);
    setMinPrice((prevMinPrice) => Math.min(prevMinPrice, newMaxPrice));
  };

  const handleApplyFilter = () => {
    onFilter(minPrice, maxPrice);
  };

  return (
    <div className="flex flex-col p-4 bg-[#415569] text-white rounded-xl mt-4">
      <h2 className="text-lg font-bold mb-4">Price</h2>
      <div className="mb-4">
        <Slider
          range
          min={0}
          max={1000}
          step={10}
          value={[minPrice, maxPrice]}
          onChange={handleSliderChange}
          className=" text-blue-700"
        />
      </div>
      <div className="flex justify-between mb-4">
        <select
          value={minPrice}
          onChange={handleMinPriceChange}
          className="p-2 rounded-md text-black"
        >
          {[0, 10, 100, 300, 400,1000].map(value => (
            <option key={value} value={value}>
              {value === 1000 ? `${value}+` : `${value}`}
            </option>
          ))}
        </select>
        <span className="mx-2">to</span>
        <select
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="p-2 rounded-md text-black"
        >
          {[50, 200, 300, 500, 1000].map(value => (
            <option key={value} value={value}>
              {value === 1000 ? `${value}` : `${value}`}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleApplyFilter}
        className="bg-blue-700 hover:bg-blue-800 text-white p-2 rounded-md"
      >
        Apply
      </button>
    </div>
  );
};

export default PriceFilter;
