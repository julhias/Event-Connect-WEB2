// src/components/layout/BottomNavigation.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function BottomNavigation() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const activeClass = "text-purple-700 font-bold";
  const inactiveClass = "text-gray-500";

  return (
    // Adiciona lg:hidden para esconder em telas grandes
    <nav className="lg:hidden bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex justify-around py-3 border-t border-gray-100 fixed bottom-0 w-full z-50 left-0">
      
      {/* Botão Início */}
      <Link 
        to="/" 
        className={`flex flex-col items-center justify-center w-1/4 transition-colors duration-200 ${isActive('/') ? activeClass : inactiveClass}`}
      >
        <svg className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1V10a1 1 0 00-1-1H7a1 1 0 00-1 1v10a1 1 0 001 1h2z" />
        </svg>
        <span className="text-[10px] font-semibold">Início</span>
      </Link>

      {/* Botão Eventos */}
      <Link 
        to="/meus-eventos" 
        className={`flex flex-col items-center justify-center w-1/4 transition-colors duration-200 ${isActive('/meus-eventos') || isActive('/eventos') ? activeClass : inactiveClass}`}
      >
        <svg className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-[10px] font-semibold">Eventos</span>
      </Link>

      {/* Botão Contratos */}
      <Link 
        to="/contratos" 
        className={`flex flex-col items-center justify-center w-1/4 transition-colors duration-200 ${isActive('/contratos') ? activeClass : inactiveClass}`}
      >
        <svg className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="text-[10px] font-semibold">Contratos</span>
      </Link>

      {/* Botão Prestadores */}
      <Link 
        to="/perfil" 
        className={`flex flex-col items-center justify-center w-1/4 transition-colors duration-200 ${isActive('/perfil') ? activeClass : inactiveClass}`}
      >
         <svg className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
         </svg>
         <span className="text-[10px] font-semibold">Perfil</span>
      </Link>
    </nav>
  );
}

export default BottomNavigation;