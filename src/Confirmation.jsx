import { useEffect, useRef } from 'react'
function Confirmation({ cartItems, orderTotal,startNewOrder,onClose })
 {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    const previousFocus = document.activeElement

    dialog?.querySelector('button')?.focus()

    return () => {
      previousFocus?.focus()
    }
  }, [])
    
   function handleKeyDown(event) {
    const dialog = dialogRef.current

    if (event.key === 'Escape') {
      onClose()
      return
    }

    if (event.key !== 'Tab' || !dialog) return

    const focusableElements = dialog.querySelectorAll(
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (!firstElement || !lastElement) return

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }

    return(
     <section className='confirmation' role="dialog" aria-modal="true" aria-labelledby="confirmation-title">
      <div className='confirmation__header'>
        <img className='confirmation__logo' src='./assets/images/icon-order-confirmed.svg' alt=''/>
        <div className='confirmation__text'>
          <h2 className='xl-text'> Order Confirmed</h2>
          <p className='md-text'>We hope you enjoy your food!</p>
        </div>
      </div>
      <div className="confirmation__content">
       <ul className='confirmation__list'>
        {cartItems.map((item) =>(
          <li className='confirmation__item' key={item.name}>
              <div className='confirmation__item-content'>
                <img className='confirmation__item-logo' src={item.image.thumbnail} alt=''/>
                <div className='confirmation__item-info'>
                  <p className='confirmation__item-name sm-text-semibold'>{item.name}</p>
                  <div className='confirmation__item-price'>
                    <p className='confirmation__item-quantity sm-text-semibold'>{item.quantity}x</p>
                    <p className='confirmation__item-quantityprice sm-text'>@${item.price.toFixed(2)}</p>
                  </div>

                </div>
              </div>
              <p className='confirmation__item-total md-text'>${(item.price * item.quantity).toFixed(2)}</p>

        </li>
        ))}
       </ul>
       <div className='confirmation__total'>
          <p className="confirmation__label sm-text"> Order total</p>
          <p className="confirmation__total-price lg-text"> ${orderTotal.toFixed(2)} </p>
       </div>
      </div>
    
      <button className="confirmation__confirm-button button--primary md-text" type="button" onClick={startNewOrder}>Start New Order</button>
    
     </section>

    )
}
export default Confirmation