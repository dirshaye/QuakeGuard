import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { safetyService } from '../services/api';

const SafetyForm = () => {
    const [formData, setFormData] = useState({
        location: '',
        buildingAge: '',
        numberOfFloors: '',
        constructionType: 'Reinforced Concrete'
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await safetyService.calculateScore({
                ...formData,
                buildingAge: parseInt(formData.buildingAge),
                numberOfFloors: parseInt(formData.numberOfFloors)
            });
            setResult(response.data);
        } catch (error) {
            console.error("Error calculating score:", error);
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return { bg: 'from-emerald-500 to-green-500', text: 'text-emerald-400', label: 'Excellent' };
        if (score >= 60) return { bg: 'from-amber-500 to-yellow-500', text: 'text-amber-400', label: 'Good' };
        if (score >= 40) return { bg: 'from-orange-500 to-amber-500', text: 'text-orange-400', label: 'Fair' };
        return { bg: 'from-red-500 to-orange-500', text: 'text-red-400', label: 'Poor' };
    };

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
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Building Safety Assessment</h1>
                        <p className="text-slate-400 text-sm">Evaluate earthquake resistance</p>
                    </div>
                </div>
            </div>

            {/* Form Card */}
            <div className="max-w-lg mx-auto">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Location / Address</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter building location"
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Building Age (Years)</label>
                                <input
                                    type="number"
                                    name="buildingAge"
                                    value={formData.buildingAge}
                                    onChange={handleChange}
                                    placeholder="e.g., 25"
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Number of Floors</label>
                                <input
                                    type="number"
                                    name="numberOfFloors"
                                    value={formData.numberOfFloors}
                                    onChange={handleChange}
                                    placeholder="e.g., 5"
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Construction Type</label>
                            <select
                                name="constructionType"
                                value={formData.constructionType}
                                onChange={handleChange}
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all cursor-pointer"
                            >
                                <option value="Reinforced Concrete">Reinforced Concrete</option>
                                <option value="Steel">Steel Frame</option>
                                <option value="Wood">Wood Frame</option>
                                <option value="Masonry">Masonry / Brick</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Analyzing...
                                </span>
                            ) : 'Calculate Safety Score'}
                        </button>
                    </form>

                    {result && (
                        <div className="mt-6 pt-6 border-t border-white/10">
                            <div className="text-center">
                                <p className="text-sm text-slate-400 mb-3">Safety Score</p>
                                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br ${getScoreColor(result.score).bg} shadow-lg mb-3`}>
                                    <span className="text-3xl font-bold text-white">{result.score.toFixed(0)}</span>
                                </div>
                                <p className={`text-lg font-semibold ${getScoreColor(result.score).text}`}>{getScoreColor(result.score).label}</p>
                                <p className="text-xs text-slate-500 mt-2">Based on building characteristics</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SafetyForm;
