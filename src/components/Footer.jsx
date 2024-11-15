/* eslint-disable no-unused-vars */
import React from "react";

import instaImg1 from "../assets/instagram-1.jpg";
import instaImg2 from "../assets/instagram-2.jpg";
import instaImg3 from "../assets/instagram-3.jpg";
import instaImg4 from "../assets/instagram-4.jpg";
import instaImg5 from "../assets/instagram-5.jpg";
import instaImg6 from "../assets/instagram-6.jpg";


const Footer = () => {
  return (
    <>
    <footer className="section__container footer__container">
      <div className="footer__col">
        <h4 className="footer__title capitalize">Contact Info</h4>
        <p>
          <span>
            <i className="ri-map-pin-line"></i>
          </span>
          1, Cathedral of St. Peter, Ake, Abeokuta, Nigeria
        </p>
        <p>
          <span>
            <i className="ri-mail-fill"></i>
          </span>
          support@showars.com
        </p>
        <p>
          <span>
            <i className="ri-phone-fill"></i>
          </span>
          +234 703 103 8093
        </p>
      </div>
      <div className="footer__col">
        <h4 className="capitalize">Company</h4>
        <a href="/">Home</a>
        <a href="/">About Us</a>
        <a href="/">Work with Us</a>
        <a href="/">Our Blogs</a>
        <a href="/">Terms and Conditions</a>
      </div>
      <div className="footer__col">
        <h4 className="capitalize">Useful Link</h4>
        <a href="/">Help</a>
        <a href="/">Track your order</a>
        <a href="/">Men</a>
        <a href="/">Women</a>
        <a href="/">Dresses</a>
      </div>
      <div>
        <h4>Instagram</h4>
        <div className="instagram__grid">
          <img src={instaImg1} alt="" />
          <img src={instaImg2} alt="" />
          <img src={instaImg3} alt="" />
          <img src={instaImg4} alt="" />
          <img src={instaImg5} alt="" />
          <img src={instaImg6} alt="" />
        </div>
      </div>
    </footer>
    <div className="footer__bar">
      <p>Copyright &copy; 2024. Developed by Showars. All rights reserved.</p>
    </div>
    </>
  );
};

export default Footer;
