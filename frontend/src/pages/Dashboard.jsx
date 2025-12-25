import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import EarthquakeMap from '../components/EarthquakeMap';
import EarthquakeList from '../components/EarthquakeList';
import { earthquakeService } from '../services/api';

const Dashboard = () => {
    const [earthquakes, setEarthquakes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEarthquake, setSelectedEarthquake] = useState(null);
    const [timeFilter, setTimeFilter] = useState('all');
    const [minMagnitude, setMinMagnitude] = useState(0);

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 60000);
        return () => clearInterval(interval);
    }, []);

    const loadData = async () => {
        try {
            const response = await earthquakeService.getRecent();
            setEarthquakes(response.data);
        } catch (error) {
            console.error("Error fetching earthquakes:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredEarthquakes = useMemo(() => {
        let filtered = earthquakes;
        
        // Time filter
        const now = Date.now();
        if (timeFilter === '1h') {
            filtered = filtered.filter(eq => now - new Date(eq.time).getTime() < 3600000);
        } else if (timeFilter === '24h') {
            filtered = filtered.filter(eq => now - new Date(eq.time).getTime() < 86400000);
        } else if (timeFilter === '48h') {
            filtered = filtered.filter(eq => now - new Date(eq.time).getTime() < 172800000);
        }
        
        // Magnitude filter
        filtered = filtered.filter(eq => eq.magnitude >= minMagnitude);
        
        return filtered;
    }, [earthquakes, timeFilter, minMagnitude]);

    const stats = useMemo(() => {
        const significant = earthquakes.filter(eq => eq.magnitude >= 4.5).length;
        const moderate = earthquakes.filter(eq => eq.magnitude >= 2.5 && eq.magnitude < 4.5).length;
        const minor = earthquakes.filter(eq => eq.magnitude < 2.5).length;
        const maxMag = earthquakes.length > 0 ? Math.max(...earthquakes.map(eq => eq.magnitude)) : 0;
        return { significant, moderate, minor, maxMag, total: earthquakes.length };
    }, [earthquakes]);

    const timeFilters = [
        { id: 'all', label: 'All' },
        { id: '1h', label: '1 Hour' },
        { id: '24h', label: '24 Hours' },
        { id: '48h', label: '48 Hours' },
    ];

    const magnitudeFilters = [
        { value: 0, label: 'All', color: 'bg-slate-500' },
        { value: 2.5, label: 'M2.5+', color: 'bg-emerald-500' },
        { value: 4.0, label: 'M4.0+', color: 'bg-amber-500' },
        { value: 5.0, label: 'M5.0+', color: 'bg-orange-500' },
        { value: 6.0, label: 'M6.0+', color: 'bg-red-500' },
    ];

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <header className="relative z-20 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white tracking-tight">QuakeGuard</h1>
                                <p className="text-xs text-slate-400">Real-time Seismic Monitor</p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            <Link to="/" className="px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-lg">
                                Dashboard
                            </Link>
                            <Link to="/safety" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                                Safety Check
                            </Link>
                            <Link to="/report" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                                Report Quake
                            </Link>
                        </nav>

                        {/* Live indicator */}
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-xs font-medium text-emerald-400">LIVE</span>
                            </div>
                            <div className="text-right hidden lg:block">
                                <p className="text-xs text-slate-400">Last updated</p>
                                <p className="text-sm font-medium text-white">{new Date().toLocaleTimeString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Stats Bar */}
            <div className="z-10 bg-slate-800/50 backdrop-blur-sm border-b border-white/5">
                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        {/* Stats */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-white">{stats.total}</p>
                                    <p className="text-xs text-slate-400">Total Events</p>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-white/10"></div>
                            <div className="flex items-center gap-4">
                                <div className="text-center">
                                    <p className="text-lg font-bold text-red-400">{stats.significant}</p>
                                    <p className="text-xs text-slate-400">M4.5+</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-lg font-bold text-amber-400">{stats.moderate}</p>
                                    <p className="text-xs text-slate-400">M2.5-4.5</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-lg font-bold text-emerald-400">{stats.minor}</p>
                                    <p className="text-xs text-slate-400">&lt;M2.5</p>
                                </div>
                            </div>
                            {stats.maxMag > 0 && (
                                <>
                                    <div className="h-8 w-px bg-white/10"></div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-slate-400">Largest:</span>
                                        <span className={`px-2 py-0.5 rounded-full text-sm font-bold ${
                                            stats.maxMag >= 5 ? 'bg-red-500/20 text-red-400' : 
                                            stats.maxMag >= 4 ? 'bg-orange-500/20 text-orange-400' : 
                                            'bg-amber-500/20 text-amber-400'
                                        }`}>
                                            M{stats.maxMag.toFixed(1)}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Filters */}
                        <div className="flex items-center gap-4 flex-wrap">
                            {/* Time Filter */}
                            <div className="flex items-center gap-1 bg-slate-700/50 rounded-lg p-1">
                                {timeFilters.map(filter => (
                                    <button
                                        key={filter.id}
                                        onClick={() => setTimeFilter(filter.id)}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                                            timeFilter === filter.id 
                                                ? 'bg-white text-slate-900' 
                                                : 'text-slate-300 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>

                            {/* Magnitude Filter */}
                            <div className="flex items-center gap-1 bg-slate-700/50 rounded-lg p-1">
                                {magnitudeFilters.map(filter => (
                                    <button
                                        key={filter.value}
                                        onClick={() => setMinMagnitude(filter.value)}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                                            minMagnitude === filter.value 
                                                ? 'bg-white text-slate-900' 
                                                : 'text-slate-300 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        <span className={`w-2 h-2 rounded-full ${filter.color}`}></span>
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
                {/* Map */}
                <div className="flex-1 relative h-[50vh] lg:h-auto">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                            <div className="text-center">
                                <div className="relative w-16 h-16 mx-auto mb-4">
                                    <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-transparent border-t-red-500 rounded-full animate-spin"></div>
                                </div>
                                <p className="text-slate-400 text-sm">Loading seismic data...</p>
                            </div>
                        </div>
                    ) : (
                        <EarthquakeMap 
                            earthquakes={filteredEarthquakes} 
                            selectedEarthquake={selectedEarthquake}
                            onSelectEarthquake={setSelectedEarthquake}
                        />
                    )}

                    {/* Map Legend */}
                    <div className="absolute bottom-4 left-4 z-[1000] bg-slate-900/90 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                        <p className="text-xs font-semibold text-slate-300 mb-2">Magnitude Scale</p>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                                <span className="text-xs text-slate-400">&lt;3.0</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-4 h-4 rounded-full bg-amber-500"></span>
                                <span className="text-xs text-slate-400">3-5</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-5 h-5 rounded-full bg-orange-500"></span>
                                <span className="text-xs text-slate-400">5-6</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-6 h-6 rounded-full bg-red-500"></span>
                                <span className="text-xs text-slate-400">6+</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-[420px] bg-slate-900/95 backdrop-blur-xl border-l border-white/10 flex flex-col h-[50vh] lg:h-auto">
                    <EarthquakeList 
                        earthquakes={filteredEarthquakes} 
                        onSelectEarthquake={setSelectedEarthquake}
                        selectedEarthquake={selectedEarthquake}
                    />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;