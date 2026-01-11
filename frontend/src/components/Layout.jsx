import React from "react";
import { Link } from "react-router-dom";
import { FaBox, FaGithub, FaCode } from "react-icons/fa";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* header */}
      <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-opacity">
            <FaBox className="text-2xl sm:text-3xl flex-shrink-0" />
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Gestión de Productos</h1>
            </div>
          </Link>
        </div>
      </header>

      {/* main */}
      <main className="flex-1 bg-gray-100">{children}</main>

      {/* footer */}
      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-">
            <div className="text-center md:text-left">
              <p className="text-gray-300 font-semibold">© 2026 Sistema de Gestión de Productos</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
