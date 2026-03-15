import React from 'react';
import PaymentGateway from '../Finance/PaymentGateway';

export default function StudentPayment() {
  return (
    <PaymentGateway 
      paymentType="Student Placement Token (ITF)" 
      amount={2000} 
      currency="₦"
      description="Mandatory 1,000–2,000 Naira token for automated Geo-Match placement and portal access." 
    />
  );
}
