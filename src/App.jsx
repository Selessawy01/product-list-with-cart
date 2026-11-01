import { useEffect, useState } from 'react'
import products from './data/data.json'
import ProductItem from './ProductItem'
import Cart from './Cart'
import Confirmation from './Confirmation'

function App() {
  
  const [cartItems, setCartItems] = useState([])
  const [showConfirmation, setShowConfirmation] = useState(false)

useEffect(() => {
  if (!showConfirmation) return

  const previousBodyOverflow = document.body.style.overflow
  const previousHtmlOverflow = document.documentElement.style.overflow

  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'

  return () => {
    document.body.style.overflow = previousBodyOverflow
    document.documentElement.style.overflow = previousHtmlOverflow
  }
}, [showConfirmation])
  function addToCart(product) {
  setCartItems((currentItems) => {
    const existingItem = currentItems.find(
      (item) => item.name === product.name
    )

    if (existingItem) {
      return currentItems.map((item) =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    }

    return [...currentItems, { ...product, quantity: 1 }]
  })
}

  function removeFromCart(productName){
    setCartItems((currentItems)=> currentItems.filter((item) => item.name !== productName)
    )
  }

  function updateQuantity (productName, newQuantity){
      if (newQuantity <= 0 ) {
        removeFromCart(productName)
        return
      }
     setCartItems((currentItems)=> currentItems.map((item)=> item.name === productName ? {...item,quantity: newQuantity} : item )
    )
  }

  function startNewOrder() {
  setCartItems([])
  setShowConfirmation(false)
}
  const cartCount = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
)

  const orderTotal = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
)

  return (
    <main>
     <section className="product">
      <h1 className='xl-text'>Dessert</h1>
      <div className="product__list">
        {products.map((product)=> {
          const cartItem = cartItems.find(
            (item) => item.name === product.name)
          
          return (
            <ProductItem key     = {product.name}
                         product = {product} 
                         quantity = {cartItem?.quantity ?? 0} 
                         onAdd    = {() => addToCart(product)}
                         onQuantityChange = { (quantity) => updateQuantity(product.name,quantity)}
            />
          )
         } 
        )}
      </div>
     </section>
    
    <Cart
      cartItems={cartItems}
      cartCount={cartCount}
      orderTotal={orderTotal}
      removeFromCart={removeFromCart}
      onConfirmOrder={() => setShowConfirmation(true)}
    />

    {showConfirmation &&(
    <div className="confirmation-overlay">
      <Confirmation 
      cartItems={cartItems}
      cartCount={cartCount}
      orderTotal={orderTotal}
      startNewOrder ={()=>startNewOrder()}
      onClose={() => setShowConfirmation(false)}
      />
    </div> 
   )}
  </main>
)}
export default App
