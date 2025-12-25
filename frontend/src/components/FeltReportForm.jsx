import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { feltReportService } from '../services/api';

const intensityDescriptions = {
    1: { label: 'Not felt', desc: 'Not felt except by very few under especially favorable conditions.' },
    2: { label: 'Weak', desc: 'Felt only by a few persons at rest, especially on upper floors.' },
    3: { label: 'Weak', desc: 'Felt quite noticeably by persons indoors. Vibration similar to passing truck.' },
    4: { label: 'Light', desc: 'Felt indoors by many, outdoors by few. Dishes, windows disturbed.' },
    5: { label: 'Moderate', desc: 'Felt by nearly everyone. Some dishes broken, unstable objects overturned.' },
    6: { label: 'Strong', desc: 'Felt by all. Some heavy furniture moved, minor damage.' },
    7: { label: 'Very Strong', desc: 'Damage negligible in well-built buildings, considerable in poorly built.' },
    8: { label: 'Severe', desc: 'Damage slight in well-designed structures, considerable in ordinary buildings.' },
    9: { label: 'Violent', desc: 'Damage considerable in specially designed structures, great in substantial buildings.' },
    10: { label: 'Extreme', desc: 'Some well-built wooden structures destroyed. Most masonry structures destroyed.' }
};

const getIntensityColor = (intensity) => {
    if (intensity <= 2) return 'bg-emerald-500';
    if (intensity <= 4) return 'bg-yellow-500';
    if (intensity <= 6) return 'bg-orange-500';
    if (intensity <= 8) return 'bg-red-500';
    return 'bg-red-700';
};

const FeltReportForm = () => {
    const [formData, setFormData] = useState({
        intensity: 5,
        description: '',
        latitude: 0,
        longitude: 0
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [locationStatus, setLocationStatus] = useState('idle');

    useEffect(() => {
        // Try to get user's location
        if (navigator.geolocation) {
            setLocationStatus('loading');
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData(prev => ({
                        ...prev,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }));
                    setLocationStatus('success');
                },
                () => setLocationStatus('error'),
                { timeout: 10000 }
            );
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await feltReportService.submitReport({
                ...formData,
                intensity: parseInt(formData.intensity)
            });
            setSubmitted(true);
        } catch (error) {
            console.error("Error submitting report:", error);
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/25">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
                    <p className="text-slate-400 mb-6">Your report helps improve earthquake monitoring.</p>
                    <div className="flex gap-3 justify-center">
                        <button 
                            onClick={() => { setSubmitted(false); setFormData({...formData, description: '', intensity: 5}); }}
                            className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
                        >
                            Submit Another
                        </button>
                        <Link to="/" className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all">
                            Back to Map
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
            {/* Header */}
            <div className="max-w-lg mx-auto mb-8">
                <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Dashboard
                </Link>
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Did You Feel It?</h1>
                        <p className="text-slate-400 text-sm">Report earthquake intensity at your location</p>
                    </div>
                </div>
            </div>

            {/* Form Card */}
            <div className="max-w-lg mx-auto">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Intensity Slider */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-4">Shaking Intensity</label>
                            <div className="flex items-center justify-center mb-4">
                                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${getIntensityColor(formData.intensity)} shadow-lg transition-all`}>
                                    <span className="text-3xl font-bold text-white">{formData.intensity}</span>
                                </div>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                name="intensity"
                                value={formData.intensity}
                                onChange={handleChange}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-1">
                                <span>Weak</span>
                                <span>Moderate</span>
                                <span>Severe</span>
                            </div>
                            <div className="mt-4 p-3 bg-slate-900/50 rounded-xl">
                                <p className="text-sm font-medium text-white">{intensityDescriptions[formData.intensity].label}</p>
                                <p className="text-xs text-slate-400 mt-1">{intensityDescriptions[formData.intensity].desc}</p>
                            </div>
                        </div>

                        {/* Location Status */}
                        <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-xl">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                locationStatus === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
                                locationStatus === 'loading' ? 'bg-blue-500/20 text-blue-400' :
                                'bg-slate-700 text-slate-400'
                            }`}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-white">
                                    {locationStatus === 'success' ? 'Location detected' :
                                     locationStatus === 'loading' ? 'Getting location...' :
                                     locationStatus === 'error' ? 'Location unavailable' : 'Location pending'}
                                </p>
                                {locationStatus === 'success' && (
                                    <p className="text-xs text-slate-400">{formData.latitude.toFixed(4)}°, {formData.longitude.toFixed(4)}°</p>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Description (optional)</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all resize-none"
                                rows="3"
                                placeholder="Describe what you felt... (e.g., dishes rattled, woke up from sleep)"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/25"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Submitting...
                                </span>
                            ) : 'Submit Report'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FeltReportForm;
