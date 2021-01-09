import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51I7bRhIVvgeSxLNgSL34OqMD8fvyo6e8uH9FG2Ob8933fA26AAW9HEL37UhSx9fLxmMG7Iwu42vP6ka6dYjcUDXD007lYJhMXv';
    const onToken = token => {
        console.log(token);
        alert('Payment Succesful!!');
    }
    return (
        <StripeCheckout
        label='Pay Now'
        name='CRWN Clothing Ltd'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}>

        </StripeCheckout>
    )
}

export default StripeCheckoutButton;