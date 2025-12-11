import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function BottomNavigation() {
  const location = useLocation();

  // Função auxiliar para saber se o botão está ativo
  const isActive = (path) => location.pathname === path;

  // Classes para itens ativos (roxo) e inativos (cinza)
  const activeClass = "text-purple-700 font-bold";
  const inactiveClass = "text-gray-500";

  return (
    <nav className="bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex justify-around py-3 border-t border-gray-100 mt-auto fixed bottom-0 w-full z-50 left-0">
      {/* Botão Início */}
      <Link to="/" className={`flex flex-col items-center justify-center w-1/4 transition-colors duration-200 ${isActive('/') ? activeClass : inactiveClass}`}>
        <svg className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1V10a1 1 0 00-1-1H7a1 1 0 00-1 1v10a1 1 0 001 1h2z" />
        </svg>
        <span className="text-[10px] font-semibold">Início</span>
      </Link>

      {/* Botão Buscar (placeholder, vai pra home por enquanto ou cria uma rota depois) */}
      <Link to="/" className={`flex flex-col items-center justify-center w-1/4 transition-colors duration-200 ${isActive('/buscar') ? activeClass : inactiveClass}`}>
        <svg className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="text-[10px] font-semibold">Buscar</span>
      </Link>

      {/* Botão Contratos */}
      <Link to="/contratos" className={`flex flex-col items-center justify-center w-1/4 transition-colors duration-200 ${isActive('/contratos') ? activeClass : inactiveClass}`}>
        <svg className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="text-[10px] font-semibold">Contratos</span>
      </Link>

      {/* Botão Prestadores (Usando ícone de perfil) */}
      <Link to="/prestadores" className={`flex flex-col items-center justify-center w-1/4 transition-colors duration-200 ${isActive('/prestadores') ? activeClass : inactiveClass}`}>
         <svg className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
         </svg>
         <span className="text-[10px] font-semibold">Prestadores</span>
      </Link>
    </nav>
  );
}

export default BottomNavigation;