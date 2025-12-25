import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const earthquakeService = {
    getRecent: () => api.get('/earthquakes'),
    filterByMagnitude: (minMag) => api.get(`/earthquakes/filter?minMag=${minMag}`),
    getById: (id) => api.get(`/earthquakes/${id}`),
};

export const safetyService = {
    calculateScore: (data) => api.post('/safety/calculate', data),
};

export const feltReportService = {
    submitReport: (data) => api.post('/reports', data),
    getStats: () => api.get('/reports/stats'),
};

export default api;
