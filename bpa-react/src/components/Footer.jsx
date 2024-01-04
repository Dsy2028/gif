import React from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/Logo.png";

const socialMedia = [
  { name: 'youtube', class: 'fa-youtube' },
  { name: 'twitter', class: 'fa-twitter' },
  { name: 'instagram', class: 'fa-instagram' },
];

const footerLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Privacy', path: '/privacy' },
  { name: 'Terms', path: '/terms' },
  { name: 'Help', path: '/help' },
];

export default function Footer() {
  return (
    <div className="flex justify-center w-full h-56 main-color text-white dark:bg-slate-800">
      <div className="pt-3 w-10/12">
        <div className="flex w-full bb-grey h-24 items-center">
          <h1 className="semibold font-semibold text-3xl">Follow us!</h1>
          <div className="ml-5 flex justify-evenly w-44 items-center">
            {socialMedia.map((media) => (
              <i className={`fa-brands ${media.class} fa-xl cursor-pointer`}></i>
            ))}
          </div>
        </div>
        <div className="flex items-center w-full h-24">
          <img src={logo} className="h-16 object-cover" />
          <div className="flex justify-evenly ml-6 w-96">
            {footerLinks.map((link) => (
              <Link to={link.path} className="footer-subtitle">{link.name}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}