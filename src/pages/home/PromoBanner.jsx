/* eslint-disable no-unused-vars */
import React from 'react'

const PromoBanner = () => {
  return (
    <section className="section__container banner__container">
      <div className="banner__card">
        <span>
          <i className="ri-truck-line"></i>
        </span>
        <h4>Free Delivery</h4>
        <p>Order over $100</p>
      </div>
      <div className="banner__card">
        <span>
          <i className="ri-money-dollar-circle-fill"></i>
        </span>
        <h4>100% Money Back</h4>
        <p>Order over $100</p>
      </div>
      <div className="banner__card">
        <span>
          <i className="ri-customer-service-2-fill"></i>
        </span>
        <h4>Customer Support</h4>
        <p>Order over $100</p>
      </div>
    </section>
  );
}

export default PromoBanner
