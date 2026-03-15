import React from 'react';
import PaymentGateway from '../Finance/PaymentGateway';

export default function CompanyPayment() {
  return (
    <PaymentGateway 
      paymentType="Company Annual Dues" 
      amount={150000} 
      currency="₦"
      description="Corporate annual IT placement processing dues for unlimited student pairing." 
    />
  );
}
