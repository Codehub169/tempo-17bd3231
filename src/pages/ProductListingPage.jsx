import React from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ProductListingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <Header />
      <main className="container mx-auto py-8 px-4 flex-grow">
        <h1 className="text-4xl font-heading text-primary text-center mb-8">Our Plushie Collection</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProductListingPage;