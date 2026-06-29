import './CheckoutHeader.css'
import './CheckoutPage.css'
import axios from 'axios'

import { useEffect, useState } from 'react'
import { OrderSummary } from './OrderSummary'
import { PaymentSummary } from './PaymentSummary'
export function CheckoutPage({ cart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [paymentSummary, setPaymentSummary] = useState({});
    useEffect(() => {
        const getDeliveryOptions = async () => {
            const response = await axios.get("/api/delivery-options?expand=estimateddeliverytime")
            setDeliveryOptions(response.data)
        }
        getDeliveryOptions();
        const getPaymentSummary = async () => {
            const response = await axios.get("/api/payment-summary")
            setPaymentSummary(response.data)
        }
        getPaymentSummary
    }, [])

    useEffect(() => {
        const initialSelected = cart.reduce((acc, cartItem) => {
            acc[cartItem.productId] = cartItem.deliveryOptionId;
            return acc;
        }, {});
        setSelectedOptions(initialSelected);
    }, [cart]);

    return (
        <>
            <title>Checkout</title>
            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/">
                            <img className="logo" src="images/logo.png" />
                            <img className="mobile-logo" src="images/mobile-logo.png" />
                        </a>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<a className="return-to-home-link"
                            href="/">3 items</a>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                   <OrderSummary cart={cart} deliveryOptions={deliveryOptions} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
                   <PaymentSummary paymentSummary={paymentSummary} />
                </div>
            </div>
        </>
    )
}