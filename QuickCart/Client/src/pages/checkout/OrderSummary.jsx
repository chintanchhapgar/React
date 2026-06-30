import { useEffect, useState } from 'react'
import { formatMoney } from '../../utils/money'
import { DeliveryOptions } from './DeliveryOptions'
import dayjs from 'dayjs'
import axios from 'axios'
export function OrderSummary({ cart, deliveryOptions, selectedOptions, setSelectedOptions, getCartItems }) {
    const [quantities, setQuantities] = useState({})

    useEffect(() => {
        const initialQuantities = {}
        cart.forEach((cartItem) => {
            initialQuantities[cartItem.productId] = cartItem.quantity
        })
        setQuantities(initialQuantities)
    }, [cart])

    return (
        <div className="order-summary">
            {
                deliveryOptions.length > 0 && cart.map((cartItem) => {
                    const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
                        return deliveryOption.id === cartItem.deliveryOptionId
                    })
                    const quantityValue = quantities[cartItem.productId] ?? cartItem.quantity
                    const updateCartItem = async () => {
                        await axios.put(`/api/cart-items/${cartItem.productId}`, {
                            quantity: quantityValue })
                        await getCartItems();
                    }
                    const deleteCartItem = async () => {
                        await axios.delete(`/api/cart-items/${cartItem.productId}`)
                        await getCartItems();
                    }
                    return (
                        <div key={cartItem.productId} className="cart-item-container">
                            <div className="delivery-date">
                                Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                            </div>

                            <div className="cart-item-details-grid">
                                <img className="product-image"
                                    src={cartItem.product.image} />

                                <div className="cart-item-details">
                                    <div className="product-name">
                                        {cartItem.product.name}
                                    </div>
                                    <div className="product-price">
                                        {formatMoney(cartItem.product.priceCents)}
                                    </div>
                                    <div className="product-quantity">
                                        <span>
                                            Quantity: <span className="quantity-label"> <input type="number" style={{ width: '60px' }} min="1" value={quantityValue} onChange={(e) => {
                                                const newQuantity = parseInt(e.target.value, 10)
                                                if (!isNaN(newQuantity) && newQuantity > 0) {
                                                    setQuantities((prev) => ({
                                                        ...prev,
                                                        [cartItem.productId]: newQuantity,
                                                    }))
                                                }
                                            }} /></span>
                                        </span>
                                        <span className="update-quantity-link link-primary" onClick={updateCartItem}>
                                            Update
                                        </span>
                                        <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                                            Delete
                                        </span>
                                    </div>
                                </div>

                                <DeliveryOptions deliveryOptions={deliveryOptions} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} cartItem={cartItem} getCartItems={getCartItems} />
                            </div>
                        </div>
                    )
                })
            }

        </div>
    );
}