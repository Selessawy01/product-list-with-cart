
function Cart({ cartItems, cartCount, orderTotal, removeFromCart,onConfirmOrder }) {
  return (
    <section className="cart">
     {cartItems.length === 0 ? (
      <div className='cart__empty'>
        <h2 className='cart__title lg-text'>Your Cart ({cartCount})</h2>
        <div className='cart__placeHolder'>
        <img className='cart_img' src='./assets/images/illustration-empty-cart.svg' alt=''/>
        <div className='cart_list'>
          <p className='cart__empty-text sm-text'>Your added items will appear here</p>
        </div>
      </div>
      </div>
    ) : (
      <div className='cart__content'>
        <h2 className='cart__title lg-text'>Your Cart ({cartCount}) </h2>

        <ul className='cart__list'>
          {cartItems.map((item) => (
          <li className="cart__item"  key={item.name}>
            <div className='cart__item-details'>
              <p className='cart__item-name sm-text-semibold'>{item.name}</p>
              <div className='cart__item-pricing'>
                <p className='cart__quantity sm-text-semibold'>{item.quantity}x</p>
                <p className='cart__item-price sm-text'>@${item.price.toFixed(2)}</p>
                <p className='cart__item-total sm-text-semibold'>${(item.price * item.quantity).toFixed(2)}</p>              
              </div>
            </div>
            <button className="cart__remove-button" type="button" aria-label={`Remove ${item.name} from cart`} onClick={() => removeFromCart(item.name)}>
              <img src='./assets/images/icon-remove-item.svg' alt=''/>
            </button>
          </li>
          ))}
        </ul>

        <div className='cart__total'>
          <p className="cart__total-label sm-text"> Order total</p>
          <p className="cart__total-price lg-text"> ${orderTotal.toFixed(2)} </p>
        </div>

        <div className='cart__delivery-message'>
          <img src='./assets/images/icon-carbon-neutral.svg' alt=''></img>
          <p className='sm-text'>This is a <span className='sm-text-semibold'>carbon-neutral</span> delivery</p>
        </div>

        <button className="cart__confirm-button button--primary md-text" type="button"  onClick={onConfirmOrder}>Confirm Order</button>
      </div>
    )}
    </section>
  )
}

export default Cart