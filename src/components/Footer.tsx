import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
// import LogoWhite from "../assets/logo_white.png";
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__header">
        <div className="footer__wrapper">
          {/* <img src={LogoWhite} alt={LogoWhite} /> */}
          <p>Gantifly</p>
        </div>
        <div className="footer__social">
          <FaFacebook className="footer__icon" />
          <FaTwitter className="footer__icon" />
          <FaInstagram className="footer__icon" />
        </div>
      </div>
      <div className="footer__container">
        <div className="footer__column">
          <h3 className="footer__title">Gantlify</h3>
          <ul className="footer__list">
            <li className="footer__item">Home</li>
            <li className="footer__item">Product</li>
            <li className="footer__item">Pricing</li>
            <li className="footer__item">Customer Success</li>
            <li className="footer__item">Templates</li>
            <li className="footer__item">Trust & Security</li>
          </ul>
        </div>

        <div className="footer__column">
          <h3 className="footer__title">Solutions</h3>
          <ul className="footer__list">
            <li className="footer__item">Project Management</li>
            <li className="footer__item">Goal Management</li>
            <li className="footer__item">Agile Management</li>
            <li className="footer__item">Task Management</li>
            <li className="footer__item">Productivity</li>
            <li className="footer__item">Work Management</li>
            <li className="footer__item">Project Planning</li>
            <li className="footer__item">To Do Lists</li>
          </ul>
        </div>

        <div className="footer__column">
          <h3 className="footer__title">About Us</h3>
          <ul className="footer__list">
            <li className="footer__item">Company</li>
            <li className="footer__item">Leadership</li>
            <li className="footer__item">Customers</li>
            <li className="footer__item">Careers</li>
            <li className="footer__item">Changelog</li>
          </ul>
        </div>

        <div className="footer__column">
          <h3 className="footer__title">Resources</h3>
          <ul className="footer__list">
            <li className="footer__item">Help Center</li>
            <li className="footer__item">FAQ</li>
            <li className="footer__item">Developers & API</li>
            <li className="footer__item">Community</li>
            <li className="footer__item">Events</li>
            <li className="footer__item">Status</li>
          </ul>
        </div>

        <div className="footer__column">
          <h3 className="footer__title">Helpful Links</h3>
          <ul className="footer__list">
            <li className="footer__item">Legal center</li>
            <li className="footer__item">Privacy policy</li>
            <li className="footer__item">Partnerships</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">By Kayumba Omari Omari, Design By Someone Else</p>
        <p className="footer__copyright">
          © Gantlify {new Date().getFullYear()} All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
