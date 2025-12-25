import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-white">QuakeGuard</span>
                    </Link>

                    {/* Navigation */}
                    <div className="flex items-center gap-1">
                        <Link 
                            to="/" 
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                                isActive('/') 
                                    ? 'text-white bg-white/10' 
                                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            Dashboard
                        </Link>
                        <Link 
                            to="/safety" 
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                                isActive('/safety') 
                                    ? 'text-white bg-white/10' 
                                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            Safety Check
                        </Link>
                        <Link 
                            to="/report" 
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                                isActive('/report') 
                                    ? 'text-white bg-white/10' 
                                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            Report Quake
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
