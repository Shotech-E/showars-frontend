/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ProductCards from './ProductCards'

import products from '../../data/products.json'

const TrendingProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(8);

    const loadMoreProducts = () => {
        setVisibleProducts(prevCount => prevCount + 4 )
    }
  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader mb-12">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente aut
        nemo totam, unde temporibus animi dolore delectus reprehenderit in atque
        consequatur ab saepe aliquid at perspiciatis ad adipisci natus? Quo.
      </p>
        {/* Product Card */}
      <div className='mt-12'> 
        <ProductCards products={products.slice(0, visibleProducts)} />
      </div>
      
      {/* Load More Products  Button */}
      <div className='product__btn'>
        {visibleProducts < products.length && (
          <div className="flex justify-center mt-4">
            <button
              onClick={loadMoreProducts}
              className="btn"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default TrendingProducts
