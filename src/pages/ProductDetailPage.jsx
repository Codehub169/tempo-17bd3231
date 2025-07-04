import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/helpers';
import QuantitySelector from '../components/QuantitySelector';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');
  const [addedToCartFeedback, setAddedToCartFeedback] = useState(false);

  useEffect(() => {
    if (product) {
      setMainImage(product.images[0] || product.image);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-bg-light">
        <Header />
        <main className="container mx-auto py-8 px-4 flex-grow text-center">
          <h1 className="text-4xl font-heading text-primary mb-4">Product Not Found</h1>
          <p className="text-lg text-text-dark mb-6">The plushie you are looking for does not exist.</p>
          <button onClick={() => navigate('/products')} className="btn btn-primary">
            Back to Products
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCartFeedback(true);
    setTimeout(() => setAddedToCartFeedback(false), 500); // Animation duration
  };

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <Header />
      <main className="container mx-auto py-8 px-4 flex-grow">
        <div className="flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow-medium p-6">
          {/* Product Image Gallery */}
          <div className="md:w-1/2 flex flex-col items-center">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full max-w-md h-auto object-contain rounded-lg shadow-light mb-4"
            />
            <div className="flex gap-2 overflow-x-auto pb-2">
              {(product.images || [product.image]).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                    mainImage === img ? 'border-primary' : 'border-transparent'
                  } hover:border-secondary transition-all duration-200`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2">
            <h1 className="text-4xl font-heading text-primary mb-2">{product.name}</h1>
            <p className="text-xl font-bold text-secondary mb-4">{formatCurrency(product.price)}</p>

            <div className="mb-6">
              <h3 className="text-lg font-heading text-text-dark mb-2">Description:</h3>
              <p className="text-text-dark leading-relaxed">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 text-text-dark">
              <div>
                <span className="font-semibold">Category:</span> {product.category}
              </div>
              <div>
                <span className="font-semibold">Animal Type:</span> {product.animalType}
              </div>
              <div>
                <span className="font-semibold">Size:</span> {product.size}
              </div>
              <div>
                <span className="font-semibold">Material:</span> {product.material}
              </div>
              <div>
                <span className="font-semibold">Age Range:</span> {product.ageRange}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="font-semibold text-text-dark">Quantity:</span>
              <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleAddToCart}
                className={`btn btn-primary btn-large flex-grow ${addedToCartFeedback ? 'btn-added' : ''}`}
              >
                <i className="fas fa-cart-plus mr-2"></i> Add to Cart
              </button>
              <button
                onClick={handleToggleWishlist}
                className={`btn btn-outline btn-large flex-grow ${isInWishlist(product.id) ? 'bg-primary text-text-light' : ''}`}
                aria-label={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <i className={`fas ${isInWishlist(product.id) ? 'fa-heart' : 'fa-heart-o'} mr-2`}></i>
                {isInWishlist(product.id) ? 'Added to Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProductDetailPage;