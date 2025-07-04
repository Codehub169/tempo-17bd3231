import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/helpers';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CheckoutPage = () => {
  const { cartItems, cartTotal, totalItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  });

  // Redirect to cart if it's empty, unless on confirmation step
  useEffect(() => {
    if (totalItems === 0 && currentStep !== 3) {
      navigate('/cart');
    }
  }, [totalItems, currentStep, navigate]);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  const validateStep = (step) => {
    let isValid = true;
    const errors = {};

    if (step === 1) {
      if (!shippingInfo.fullName) errors.fullName = 'Full Name is required.';
      if (!shippingInfo.address1) errors.address1 = 'Address Line 1 is required.';
      if (!shippingInfo.city) errors.city = 'City is required.';
      if (!shippingInfo.state) errors.state = 'State is required.';
      if (!shippingInfo.zipCode || !/^\d{5}(-\d{4})?$/.test(shippingInfo.zipCode)) errors.zipCode = 'Valid Zip Code is required.';
      if (!shippingInfo.country) errors.country = 'Country is required.';
      if (!shippingInfo.phone || !/^\d{10,15}$/.test(shippingInfo.phone)) errors.phone = 'Valid Phone Number is required.';

      if (Object.keys(errors).length > 0) {
        isValid = false;
        alert('Please fill in all required shipping fields correctly.');
      }
    } else if (step === 2) {
      if (!paymentInfo.cardName) errors.cardName = 'Name on Card is required.';
      if (!paymentInfo.cardNumber || !/^\d{13,19}$/.test(paymentInfo.cardNumber)) errors.cardNumber = 'Valid Card Number is required.';
      if (!paymentInfo.expMonth || !/^(0[1-9]|1[0-2])$/.test(paymentInfo.expMonth)) errors.expMonth = 'Valid Expiration Month (MM) is required.';
      if (!paymentInfo.expYear || !/^\d{2}$/.test(paymentInfo.expYear)) errors.expYear = 'Valid Expiration Year (YY) is required.';
      if (!paymentInfo.cvv || !/^\d{3,4}$/.test(paymentInfo.cvv)) errors.cvv = 'Valid CVV is required.';

      if (Object.keys(errors).length > 0) {
        isValid = false;
        alert('Please fill in all required payment fields correctly.');
      }
    }
    return isValid;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      if (currentStep === 2) {
        // This is the final step before confirmation, simulate order placement
        clearCart(); // Clear cart as part of simulated checkout
      }
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const shippingCost = totalItems > 0 ? 5.00 : 0.00; // Flat rate shipping
  const finalTotal = cartTotal + shippingCost;

  const renderFormSection = () => {
    // Corrected focus classes based on src/index.css
    const inputFocusClasses = "focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20";

    switch (currentStep) {
      case 1:
        return (
          <div id="step-1" className="checkout-form-section active">
            <h3 className="text-primary font-heading text-xl mb-4">Shipping Address</h3>
            <div className="form-group">
              <label htmlFor="fullName" className="block text-dark mb-2 font-bold">Full Name</label>
              <input type="text" id="fullName" name="fullName" value={shippingInfo.fullName} onChange={handleShippingChange} className={`w-full p-2 border border-border-color rounded-md font-body text-base transition-colors duration-300 ${inputFocusClasses}`} required />
            </div>
            <div className="form-group">
              <label htmlFor="address1" className="block text-dark mb-2 font-bold">Address Line 1</label>
              <input type="text" id="address1" name="address1" value={shippingInfo.address1} onChange={handleShippingChange} className={`w-full p-2 border border-border-color rounded-md font-body text-base transition-colors duration-300 ${inputFocusClasses}`} required />
            </div>
            <div className="form-group">
              <label htmlFor="address2" className="block text-dark mb-2 font-bold">Address Line 2 (Optional)</label>
              <input type="text" id="address2" name="address2" value={shippingInfo.address2} onChange={handleShippingChange} className={`w-full p-2 border border-border-color rounded-md font-body text-base transition-colors duration-300 ${inputFocusClasses}`} />
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="form-group flex-1">
                <label htmlFor="city" className="block text-dark mb-2 font-bold">City</label>
                <input type="text" id="city" name="city" value={shippingInfo.city} onChange={handleShippingChange} className={`w-full p-2 border border-border-color rounded-md font-body text-base transition-colors duration-300 ${inputFocusClasses}`} required />
              </div>
              <div className="form-group flex-1">
                <label htmlFor="state" className="block text-dark mb-2 font-bold">State</label>
                <input type="text" id="state" name="state" value={shippingInfo.state} onChange={handleShippingChange} className={`w-full p-2 border border-border-color rounded-md font-body text-base transition-colors duration-300 ${inputFocusClasses}`} required />
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="form-group flex-1">
                <label htmlFor="zipCode" className="block text-dark mb-2 font-bold">Zip Code</label>
                <input type="text" id="zipCode" name="zipCode" value={shippingInfo.zipCode} onChange={handleShippingChange} pattern="[0-9]{5}(-[0-9]{4})?" className={`w-full p-2 border border-border-color rounded-md font-body text-base transition-colors duration-300 ${inputFocusClasses}`} required />
              </div>
              <div className="form-group flex-1">
                <label htmlFor="country" className="block text-dark mb-2 font-bold">Country</label>
                <select id="country" name="country" value={shippingInfo.country} onChange={handleShippingChange} className={`w-full p-2 border border-border-color rounded-md font-body text-base transition-colors duration-300 ${inputFocusClasses}`} required>
                  <option value="">Select Country</option>
                  <option value="USA">United States</option>
                  <option value="CAN">Canada</option>
                  <option value="GBR">United Kingdom</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="block text-dark mb-2 font-bold">Phone Number</label>
              <input type="tel" id="phone" name="phone" value={shippingInfo.phone} onChange={handleShippingChange} pattern="[0-9]{10,15}" className={`w-full p-2 border border-border-color rounded-md font-body text-base transition-colors duration-300 ${inputFocusClasses}`} required />
            </div>
            <div className="flex justify-end mt-6">
              <button type="button" onClick={handleNextStep} className={`btn btn-secondary ${totalItems === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={totalItems === 0}>Next: Payment</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div id="step-2" className="checkout-form-section active">
            <h3 className="text-primary font-heading text-xl mb-4">Payment Information</h3>
            <div className="form-group">
              <label htmlFor="cardName" className="block text-dark mb-2 font-bold">Name on Card</label>
              <input type="text" id="cardName" name="cardName" value={paymentInfo.cardName} onChange={handlePaymentChange} className={`w-full p-2 border border-border-color rounded-md font-body text-base transition-colors duration-300 ${inputFocusClasses}`} required />
            </div>
            <div className="form-group">
              <label htmlFor="cardNumber" className="block text-dark mb-2 font-bold">Card Number</label>
              <input type="text" id="cardNumber" name="cardNumber" value={paymentInfo.cardNumber} onChange={handlePaymentChange} pattern="[0-9]{13,19}" className={`w-full p-2 border border-border-color rounded-md font-body text-base transition-colors duration-300 ${inputFocusClasses}`} required />
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="form-group flex-1">
                <label htmlFor="expMonth" className="block text-dark mb-2 font-bold">Expiration Month</label>
                <input type="text" id="expMonth" name="expMonth" placeholder="MM" value={paymentInfo.expMonth} onChange={handlePaymentChange} pattern="(0[1-9]|1[0-2])" className={`w-full p-2 border border-border-color rounded-md font-body text-base transition-colors duration-300 ${inputFocusClasses}`} required />
              </div>
              <div className="form-group flex-1">
                <label htmlFor="expYear" className="block text-dark mb-2 font-bold">Expiration Year</label>
                <input type="text" id="expYear" name="expYear" placeholder="YY" value={paymentInfo.expYear} onChange={handlePaymentChange} pattern="[0-9]{2}" className={`w-full p-2 border border-border-color rounded-md font-body text-base transition-colors duration-300 ${inputFocusClasses}`} required />
              </div>
              <div className="form-group flex-1">
                <label htmlFor="cvv" className="block text-dark mb-2 font-bold">CVV</label>
                <input type="text" id="cvv" name="cvv" value={paymentInfo.cvv} onChange={handlePaymentChange} pattern="[0-9]{3,4}" className={`w-full p-2 border border-border-color rounded-md font-body text-base transition-colors duration-300 ${inputFocusClasses}`} required />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button type="button" onClick={handlePrevStep} className="btn btn-outline">Previous</button>
              <button type="button" onClick={handleNextStep} className="btn btn-primary">Review Order</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div id="step-3" className="checkout-form-section active">
            <h3 className="text-primary font-heading text-xl mb-4">Order Confirmation</h3>
            <div className="text-center p-8 bg-white rounded-lg shadow-medium">
              <div className="text-secondary text-5xl mb-4"><i className="fas fa-check-circle"></i></div>
              <h2 className="text-secondary text-2xl mb-4">Your Order is Confirmed!</h2>
              <p className="text-gray-600 mb-4">Thank you for your purchase from Plushie Haven. Your order has been successfully placed and will be processed shortly.</p>
              <p className="text-gray-600">A confirmation email has been sent to your provided email address.</p>
              <p className="mt-4 text-lg font-bold">Order ID: <strong className="text-primary">PHN-2023-XYZ123</strong></p>
              <div className="flex justify-center gap-4 mt-6">
                <Link to="/account" className="btn btn-secondary">View My Orders</Link>
                <Link to="/" className="btn btn-outline">Continue Shopping</Link>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <Header />
      <main className="container mx-auto flex flex-wrap gap-6 py-12 px-4 flex-grow">
        <section className="flex-2 min-w-[300px]">
          <h2 className="font-heading text-primary text-3xl mb-6">Checkout</h2>
          <div className="flex justify-around mb-6 border-b-2 border-border-color pb-2">
            <div
              className={`checkout-step py-2 px-4 rounded-md font-bold text-gray-500 cursor-pointer flex-1 mx-1 text-center transition-all duration-300
                ${currentStep === 1 ? 'bg-secondary text-text-light shadow-light' : ''}
                ${currentStep > 1 ? 'bg-primary text-text-light' : ''}
              `}
              onClick={() => setCurrentStep(1)}
            >
              1. Shipping
            </div>
            <div
              className={`checkout-step py-2 px-4 rounded-md font-bold text-gray-500 cursor-pointer flex-1 mx-1 text-center transition-all duration-300
                ${currentStep === 2 ? 'bg-secondary text-text-light shadow-light' : ''}
                ${currentStep > 2 ? 'bg-primary text-text-light' : ''}
              `}
              onClick={() => currentStep >= 2 && setCurrentStep(2)}
            >
              2. Payment
            </div>
            <div
              className={`checkout-step py-2 px-4 rounded-md font-bold text-gray-500 cursor-pointer flex-1 mx-1 text-center transition-all duration-300
                ${currentStep === 3 ? 'bg-secondary text-text-light shadow-light' : ''}
              `}
              onClick={() => currentStep >= 3 && setCurrentStep(3)}
            >
              3. Confirmation
            </div>
          </div>

          {renderFormSection()}
        </section>

        <section className="flex-1 min-w-[280px] bg-white rounded-lg shadow-light p-6 h-fit">
          <h3 className="font-heading text-secondary text-xl mb-4">Your Order</h3>
          <div id="checkout-order-items">
            {cartItems.length === 0 && currentStep !== 3 ? (
              <p className="text-center p-5 text-gray-600">Your cart is empty.</p>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="flex justify-between mb-2 pb-2 border-b border-dashed border-border-color last:border-b-0 last:mb-0 last:pb-0">
                  <span className="text-dark">{item.name} (x{item.quantity})</span>
                  <span className="text-dark font-semibold">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))
            )}
          </div>
          <div className="flex justify-between mb-2 pb-2 border-b border-dashed border-border-color mt-4">
            <span className="text-dark">Subtotal:</span>
            <span id="summary-subtotal" className="text-dark font-semibold">{formatCurrency(cartTotal)}</span>
          </div>
          <div className="flex justify-between mb-2 pb-2 border-b border-dashed border-border-color">
            <span className="text-dark">Shipping:</span>
            <span id="summary-shipping" className="text-dark font-semibold">{formatCurrency(shippingCost)}</span>
          </div>
          <div className="flex justify-between text-2xl font-bold text-primary border-t border-border-color pt-2 mt-2">
            <span>Total:</span>
            <span id="summary-total">{formatCurrency(finalTotal)}</span>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;