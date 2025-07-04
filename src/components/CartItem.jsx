import React from 'react';
import { Link } from 'react-router-dom';
import QuantitySelector from './QuantitySelector';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  // Calculate the total price for this specific item
  const itemTotal = item.price * item.quantity;

  return (
    <div className="flex items-center gap-4 p-4 border border-border-color rounded-soft bg-white shadow-light flex-wrap sm:flex-nowrap">
      {/* Product Image */}
      <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded-soft" />

      {/* Product Details */}
      <div className="flex-grow text-center sm:text-left">
        <h4 className="mb-1 text-lg text-text-dark font-heading">
          <Link to={`/product/${item.id}`} className="hover:text-primary-color">
            {item.name}
          </Link>
        </h4>
        <p className="font-bold text-primary-color">${item.price.toFixed(2)}</p>
      </div>

      {/* Quantity Selector and Remove Button */}
      <div className="flex items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto justify-center">
        <QuantitySelector
          quantity={item.quantity}
          onQuantityChange={(newQuantity) => onUpdateQuantity(item.id, newQuantity)}
          min={1}
          max={99} // Arbitrary max quantity
        />
        <button
          onClick={() => onRemoveItem(item.id)}
          className="w-8 h-8 flex-center bg-red-500 text-text-light rounded-full text-lg cursor-pointer transition-colors duration-300 hover:bg-red-600"
          aria-label={`Remove ${item.name} from cart`}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
