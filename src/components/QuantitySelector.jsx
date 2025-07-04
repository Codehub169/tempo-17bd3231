import React from 'react';

function QuantitySelector({ quantity, onQuantityChange, min = 1, max = 99 }) {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }
    onQuantityChange(value);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleDecrease}
        className="w-8 h-8 bg-secondary text-light rounded-full text-lg cursor-pointer transition-colors duration-300 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
        disabled={quantity <= min}
      >
        -
      </button>
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        min={min}
        max={max}
        className="w-16 text-center p-2 border border-border-color rounded-md font-body text-base focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary focus:ring-opacity-20"
      />
      <button
        onClick={handleIncrease}
        className="w-8 h-8 bg-secondary text-light rounded-full text-lg cursor-pointer transition-colors duration-300 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
        disabled={quantity >= max}
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;
