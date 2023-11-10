import React, { useEffect } from 'react';

function OrderConfirmation() {

    const currentUrl = window.location.href;
    const orderId = currentUrl.split('orderconfirmation/').pop();

    console.log(orderId)
return(
    <h1>Thank you for your order! Your order ID is {orderId}</h1>
)
}

export default OrderConfirmation;