import React from "react";
import { connect } from "react-redux";
import CartItem from "../cart-item/cart-item.component";
import CustomButton from "../custom-button/custom-button.component";
import './cart-dropdown.styles.scss';

const CartDropdown = ({cartItems}) => (
    <div className='cart-dropdown'>        
        <div className='cart-items'>
            {
                cartItems.map(cartItem => <CartItem key={CartItem.id} item={cartItem} ></CartItem> )
            }
        </div>
        <CustomButton>Go To Checkout</CustomButton>
    </div>
)

const mapStateToProps = ( {cart: {cartItems}}) => ({
    cartItems: cartItems
})

export default connect(mapStateToProps)(CartDropdown);