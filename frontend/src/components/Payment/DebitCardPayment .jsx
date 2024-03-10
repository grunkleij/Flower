import React, { useState } from 'react';

const DebitCardPayment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission here
    console.log('Card Number:', cardNumber);
    console.log('Expiry Date:', expiryDate);
    console.log('CVV:', cvv);
    // You can integrate with a payment gateway or perform any other action here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="cardNumber">Card Number</label>
        <input
          type="text"
          className="form-control"
          id="cardNumber"
          value={cardNumber}
          onChange={handleCardNumberChange}
          placeholder="Enter card number"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="expiryDate">Expiry Date</label>
        <input
          type="text"
          className="form-control"
          id="expiryDate"
          value={expiryDate}
          onChange={handleExpiryDateChange}
          placeholder="MM/YY"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="cvv">CVV</label>
        <input
          type="text"
          className="form-control"
          id="cvv"
          value={cvv}
          onChange={handleCvvChange}
          placeholder="Enter CVV"
          required
        />
      </div>
    </form>
  );
};

export default DebitCardPayment;
