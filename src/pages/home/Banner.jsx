/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

import bannerImg from "../../assets/e-com.png";

const Banner = () => {
  return (
    <div className="section__container header__container">
      <div className="header__content z-30">
        <h4 className="uppercase">Up to 10% Discount</h4>
        <h1>Girl&apos;s Fashion</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias
          omnis veniam officia quod quisquam maiores eveniet atque beatae
          adipisci odit saepe sed temporibus, in aperiam esse placeat, minima ex
          eaque!
        </p>
        <button className="btn">
          <Link to="/shop">Shop Now</Link>
        </button>
      </div>
      <div className="header__image">
        <img src={bannerImg} alt="Banner Image" />
      </div>
    </div>
  );
}

export default Banner
