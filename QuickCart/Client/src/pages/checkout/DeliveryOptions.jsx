import { formatMoney } from '../../utils/money'
import dayjs from 'dayjs'
import axios from 'axios'
export function DeliveryOptions({ cartItem, deliveryOptions, selectedOptions, setSelectedOptions, getCartItems }) {
    return (
        <div className="delivery-options">
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>
            {
                deliveryOptions.map((deliveryOption) => {
                    //  console.log(deliveryOption.estimatedDeliveryTimeMs)
                    let priceString = 'FREE Shipping'
                    if (deliveryOption.priceCents > 0) {
                        priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`
                    }
                    const selectedDeliveryOptionId = selectedOptions[cartItem.productId] ?? cartItem.deliveryOptionId;
                    const updateDeliveryOption = async () => {
                        await axios.put(`/api/cart-items/${cartItem.productId}`, {
                            deliveryOptionId: deliveryOption.id
                        })
                        await getCartItems();
                    }
                    return (
                        <div key={deliveryOption.id} className="delivery-option"
                            onClick={updateDeliveryOption}
                        >
                            <input
                                type="radio"
                                value={deliveryOption.id}
                                checked={deliveryOption.id === selectedDeliveryOptionId}
                                onChange={() => setSelectedOptions((prev) => ({
                                    ...prev,
                                    [cartItem.productId]: deliveryOption.id
                                }))}
                                className="delivery-option-input"
                                name={`delivery-option-${cartItem.productId}`} />
                            <div>
                                <div className="delivery-option-date">
                                    {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                </div>
                                <div className="delivery-option-price">
                                    {priceString}
                                </div>
                            </div>
                        </div>
                    )

                })
            }
        </div>
    );
}