import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h4 className="text-xl font-bold mb-4">Download our App</h4>
            <p className="text-gray-400">Download our app for Android and iOS</p>
            <div className="flex space-x-4">
              <img src="/images/two.png" alt="Google Play Store" className="h-10" />
              <img src="/images/one.png" alt="Apple App Store" className="h-10" />
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">E-COMMERCE</h1>
            <p className="text-gray-400">High quality is our first priority</p>
            <h6 className="text-sm">&copy; 2023 Naveed_Islam. All rights reserved.</h6>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-xl font-bold mb-4">Follow Us</h4>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="flex items-center hover:text-gray-300 transition-colors duration-300 no-underline text-white">
                  <FaInstagram className="mr-2" />
                  Instagram
                </Link>
              </li>
              <li>
                <Link to="#" className="flex items-center hover:text-gray-300 transition-colors duration-300 no-underline text-white">
                  <FaLinkedin className="mr-2" />
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link to="#" className="flex items-center hover:text-gray-300 transition-colors duration-300 no-underline text-white">
                  <FaSquareXTwitter className="mr-2" />
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-8 border-t border-gray-800">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <nav className="mb-4 md:mb-0">
            <ul className="flex space-x-4">
              <li className="no-underline"><Link href="#" className="hover:text-gray-300 transition-colors duration-300 no-underline text-white">Privacy Policy</Link></li>
              <li className="no-underline"><Link href="#" className="hover:text-gray-300 transition-colors duration-300 no-underline text-white">Terms of Service</Link></li>
              <li className="no-underline"><Link href="#" className="hover:text-gray-300 transition-colors duration-300 no-underline text-white">Contact Us</Link></li>
            </ul>
          </nav>
          <p className="text-sm text-gray-400">
            Designed and built with all the love in the world by the E-COMMERCE team.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;