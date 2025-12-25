import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Component to handle map view updates
const MapController = ({ selectedEarthquake }) => {
    const map = useMap();

    useEffect(() => {
        if (selectedEarthquake) {
            map.flyTo([selectedEarthquake.latitude, selectedEarthquake.longitude], 6, {
                duration: 1.5
            });
        }
    }, [selectedEarthquake, map]);

    return null;
};

// Get color based on magnitude
const getMagnitudeColor = (magnitude) => {
    if (magnitude >= 6) return '#ef4444'; // red-500
    if (magnitude >= 5) return '#f97316'; // orange-500
    if (magnitude >= 4) return '#f59e0b'; // amber-500
    if (magnitude >= 3) return '#eab308'; // yellow-500
    return '#22c55e'; // green-500
};

// Get radius based on magnitude
const getMagnitudeRadius = (magnitude) => {
    if (magnitude >= 6) return 20;
    if (magnitude >= 5) return 16;
    if (magnitude >= 4) return 12;
    if (magnitude >= 3) return 8;
    return 5;
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

const EarthquakeMap = ({ earthquakes, selectedEarthquake, onSelectEarthquake }) => {
    const defaultCenter = [20, 0];
    const defaultZoom = 2;

    return (
        <div className="h-full w-full">
            <MapContainer 
                center={defaultCenter} 
                zoom={defaultZoom} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
                zoomControl={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <MapController selectedEarthquake={selectedEarthquake} />
                
                {earthquakes.map((eq) => {
                    const color = getMagnitudeColor(eq.magnitude);
                    const radius = getMagnitudeRadius(eq.magnitude);
                    const isSelected = selectedEarthquake?.id === eq.id;
                    
                    return (
                        <CircleMarker
                            key={eq.id}
                            center={[eq.latitude, eq.longitude]}
                            radius={isSelected ? radius * 1.5 : radius}
                            pathOptions={{
                                color: isSelected ? '#ffffff' : color,
                                fillColor: color,
                                fillOpacity: isSelected ? 0.9 : 0.7,
                                weight: isSelected ? 3 : 2,
                            }}
                            eventHandlers={{
                                click: () => onSelectEarthquake && onSelectEarthquake(eq),
                            }}
                        >
                            <Popup>
                                <div className="p-3 min-w-[240px]">
                                    <div className="flex items-start justify-between mb-3">
                                        <div 
                                            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                                            style={{ backgroundColor: color }}
                                        >
                                            {eq.magnitude.toFixed(1)}
                                        </div>
                                        <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded-full">
                                            {getTimeAgo(eq.time)}
                                        </span>
                                    </div>
                                    
                                    <h3 className="font-semibold text-white text-sm mb-3 leading-tight">
                                        {eq.place}
                                    </h3>
                                    
                                    <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                                        <div className="bg-slate-800 rounded-lg p-2">
                                            <p className="text-slate-400 mb-0.5">Depth</p>
                                            <p className="text-white font-medium">{eq.depth?.toFixed(1)} km</p>
                                        </div>
                                        <div className="bg-slate-800 rounded-lg p-2">
                                            <p className="text-slate-400 mb-0.5">Coordinates</p>
                                            <p className="text-white font-medium text-[10px]">
                                                {eq.latitude?.toFixed(2)}°, {eq.longitude?.toFixed(2)}°
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="text-xs text-slate-400 mb-3">
                                        {new Date(eq.time).toLocaleString()}
                                    </div>
                                    
                                    <a 
                                        href={eq.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="flex items-center justify-center gap-2 w-full py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium rounded-lg transition-colors"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        View on USGS
                                    </a>
                                </div>
                            </Popup>
                        </CircleMarker>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default EarthquakeMap;
