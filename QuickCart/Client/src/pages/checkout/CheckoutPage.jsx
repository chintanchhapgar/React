import './CheckoutHeader.css'
import './CheckoutPage.css'
import axios from 'axios'

import { useEffect, useState } from 'react'
import { OrderSummary } from './OrderSummary'
import { PaymentSummary } from './PaymentSummary'
import { Link } from 'react-router'
export function CheckoutPage({ cart, getCartItems }) {

    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [paymentSummary, setPaymentSummary] = useState({});

    useEffect(() => {
        const getDeliveryOptions = async () => {
            const response = await axios.get("/api/delivery-options?expand=estimateddeliverytime")
            setDeliveryOptions(response.data)
        }
        getDeliveryOptions();
    }, [])

    useEffect(() => {
        const getPaymentSummary = async () => {
            const response = await axios.get("/api/payment-summary")
            setPaymentSummary(response.data)
        }
        getPaymentSummary();
    }, [cart])

    useEffect(() => {
        const initialSelected = cart.reduce((acc, cartItem) => {
            acc[cartItem.productId] = cartItem.deliveryOptionId;
            return acc;
        }, {});
        setSelectedOptions(initialSelected);
    }, []);

    return (
        <>
            <title>Checkout</title>
            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <Link to="/">
                            <img className="logo" src="images/logo.png" />
                            <img className="mobile-logo" src="images/mobile-logo.png" />
                        </Link>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<Link className="return-to-home-link" to="/">
                            {cart.length} items
                        </Link>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                {cart.length > 0 ?
                    (
                        <div className="checkout-grid">
                            <OrderSummary cart={cart} deliveryOptions={deliveryOptions} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} getCartItems={getCartItems} />
                            <PaymentSummary paymentSummary={paymentSummary} getCartItems={getCartItems} />
                        </div>
                    )
                    :
                    (
                        <div className="checkout-grid">
                            Oops! Your cart is empty.
                        </div>
                    )
                }
            </div>
        </>
    )
}