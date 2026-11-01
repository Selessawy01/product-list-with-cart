function ProductItem({ product, quantity, onAdd, onQuantityChange}) 
{
  return (
    
    <article className="product__item">
      <div className="product__image">
        <picture className={`product__image-wrapper ${
    quantity > 0 ? 'product__image-wrapper--selected' : ''
  }`}>
          <source
            media="(min-width: 64rem)"
            srcSet={product.image.desktop}
          />
          <source
            media="(min-width: 40rem)"
            srcSet={product.image.tablet}
          />
          <img
            src={product.image.mobile}
            alt={product.name}
          />
        </picture>

        {quantity === 0 ? (
         <button className=" product__action product__btn  sm-text-semibold" type="button" onClick={onAdd}>
            <img  src="/assets/images/icon-add-to-cart.svg" alt="" />
            Add to cart
         </button>
        ) : (
          
         <div className="product__action product__counter">
            <button className='product__counter-btn'
                    type="button" 
                    onClick={() => onQuantityChange(quantity - 1)}  
                    aria-label={`Remove one ${product.name}`}>
            <img src='./assets/images/icon-decrement-quantity.svg' alt=''/>
            </button>

            <span aria-live="polite">{quantity}</span>

            <button className='product__counter-btn'
              type="button"
              onClick={() => onQuantityChange(quantity + 1)}
              aria-label={`Add one ${product.name}`}
            >
              <img src='./assets/images/icon-increment-quantity.svg' alt=''/>
            </button>
          </div>
        )}
      </div>

      <div className="product__info">
        <p className="product__category sm-text">{product.category}</p>
        <h2 className='product__name md-text'>{product.name}</h2>
        <p className="product__price md-text">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </article>
  )
}

export default ProductItem
