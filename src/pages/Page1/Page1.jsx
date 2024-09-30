import React, { Fragment } from "react";
import { CiDesktopMouse2 } from "react-icons/ci";
import { Link } from "react-router-dom";
import Page2 from "../Page2/Page2"

const Main = () => {
  return (
    <Fragment>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex flex-col justify-center items-center text-white font-sans relative overflow-hidden cut-bottom">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://i.pinimg.com/564x/1a/b1/af/1ab1af3ba1c3e20897692c5210048d0d.jpg')"}} />
        <div className="z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-semibold text-blue-200 mb-2">Welcome to</h3>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
            E-COMMERCE EMPORIUM
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-gray-200">FIND AMAZING PRODUCTS BELOW</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#shop" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded transition duration-300 no-underline">
              Shop Now
            </Link>
            <Link href="#about" className="bg-transparent hover:bg-white/10 text-white font-bold py-3 px-6 rounded border-2 border-white transition duration-300 no-underline">
              Learn More
            </Link>
          </div>
        </div>
        <a href="#Home" className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-white hover:text-white transition-colors duration-300 bg-slate-400 py-3 px-6 mb-8 rounded-md no-underline font-semibold hover:bg-slate-500 ease-out">
          <span>Explore</span>
          <CiDesktopMouse2 className="animate-bounce text-white" />
        </a>
        
      </div>
      <Page2 />
     
      <style jsx>{`
        .cut-bottom {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }
      `}</style>
    </Fragment>
  );
};

export default Main;