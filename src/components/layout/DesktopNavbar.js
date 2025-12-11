// src/components/layout/DesktopNavbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function DesktopNavbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Início', icon: '🏠' },
    { path: '/prestadores', label: 'Prestadores', icon: '👥' },
    { path: '/geolocation', label: 'Geolocalização', icon: '📍' },
    { path: '/meus-eventos', label: 'Meus Eventos', icon: '📅' },
    { path: '/contratos', label: 'Contratos', icon: '📝' },
    { path: '/pagamento', label: 'Pagamento', icon: '💳' },
  ];

  return (
    <nav className="hidden lg:block bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="text-3xl group-hover:scale-110 transition-transform">🎉</div>
            <div>
              <h1 className="text-2xl font-bold text-purple-700">EventConnect</h1>
              <p className="text-xs text-gray-500">Sistema de gestão de eventos</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200
                  flex items-center space-x-2
                  ${isActive(link.path)
                    ? 'bg-purple-100 text-purple-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <Link to="/perfil" className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                U
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DesktopNavbar;