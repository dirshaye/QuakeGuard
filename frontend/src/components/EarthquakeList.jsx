import React from 'react';

// Get color based on magnitude
const getMagnitudeColor = (magnitude) => {
    if (magnitude >= 6) return { bg: 'bg-red-500', text: 'text-red-500', border: 'border-red-500/30', glow: 'shadow-red-500/20' };
    if (magnitude >= 5) return { bg: 'bg-orange-500', text: 'text-orange-500', border: 'border-orange-500/30', glow: 'shadow-orange-500/20' };
    if (magnitude >= 4) return { bg: 'bg-amber-500', text: 'text-amber-500', border: 'border-amber-500/30', glow: 'shadow-amber-500/20' };
    if (magnitude >= 3) return { bg: 'bg-yellow-500', text: 'text-yellow-500', border: 'border-yellow-500/30', glow: 'shadow-yellow-500/20' };
    return { bg: 'bg-emerald-500', text: 'text-emerald-500', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' };
};

// Format time ago
const getTimeAgo = (time) => {
    const seconds = Math.floor((Date.now() - new Date(time).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
};

const EarthquakeList = ({ earthquakes, onSelectEarthquake, selectedEarthquake }) => {
    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-4 py-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-white">Recent Earthquakes</h2>
                        <p className="text-sm text-slate-400">{earthquakes.length} events detected</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-slate-400">Auto-refresh</span>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
                {earthquakes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <p className="text-slate-400 text-sm">No earthquakes match your filters</p>
                        <p className="text-slate-500 text-xs mt-1">Try adjusting the time or magnitude filters</p>
                    </div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {earthquakes.map((eq) => {
                            const colors = getMagnitudeColor(eq.magnitude);
                            const isSelected = selectedEarthquake?.id === eq.id;
                            
                            return (
                                <div
                                    key={eq.id}
                                    onClick={() => onSelectEarthquake && onSelectEarthquake(eq)}
                                    className={`px-4 py-3 cursor-pointer transition-all duration-200 ${
                                        isSelected 
                                            ? 'bg-white/10 border-l-2 border-l-white' 
                                            : 'hover:bg-white/5 border-l-2 border-l-transparent'
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        {/* Magnitude Badge */}
                                        <div className={`relative flex-shrink-0`}>
                                            <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center shadow-lg ${colors.glow}`}>
                                                <span className="text-white font-bold text-sm">
                                                    {eq.magnitude.toFixed(1)}
                                                </span>
                                            </div>
                                            {eq.magnitude >= 5 && (
                                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colors.bg} opacity-75`}></span>
                                                    <span className={`relative inline-flex rounded-full h-3 w-3 ${colors.bg}`}></span>
                                                </span>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white truncate leading-tight">
                                                {eq.place}
                                            </p>
                                            <div className="flex items-center gap-3 mt-1.5">
                                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                    </svg>
                                                    {eq.depth?.toFixed(0)} km
                                                </span>
                                                <span className="text-xs text-slate-500">•</span>
                                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {getTimeAgo(eq.time)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        <svg className={`w-4 h-4 text-slate-500 flex-shrink-0 transition-transform ${isSelected ? 'translate-x-1' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-white/10 bg-slate-800/50">
                <p className="text-xs text-slate-500 text-center">
                    Data from <a href="https://earthquake.usgs.gov" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">USGS Earthquake Hazards Program</a>
                </p>
            </div>
        </div>
    );
};

export default EarthquakeList;
