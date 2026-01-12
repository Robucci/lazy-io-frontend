// LAZY.IO - API Helper
// Gestion des appels vers le backend

const API_BASE_URL = 'https://api.lazyio.xyz/api/v1';

// Helper pour faire des requêtes API
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    };
    
    // Ajouter le token si disponible
    const token = getAuthToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    try {
        const response = await fetch(url, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.detail || 'Erreur API');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// ===== AUTH ENDPOINTS =====

async function registerBeta(userData) {
    return apiRequest('/auth/register-beta', {
        method: 'POST',
        body: JSON.stringify(userData)
    });
}

async function login(email, password) {
    return apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    });
}

async function getBetaSlots() {
    return apiRequest('/auth/beta/available-slots');
}

// ===== BOTS ENDPOINTS =====

async function getUserBots() {
    return apiRequest('/bots/');
}

async function getBotDetails(botId) {
    return apiRequest(`/bots/${botId}`);
}

async function startBot(botId) {
    return apiRequest(`/bots/${botId}/start`, {
        method: 'POST'
    });
}

async function stopBot(botId) {
    return apiRequest(`/bots/${botId}/stop`, {
        method: 'POST'
    });
}

// ===== STATS ENDPOINTS =====

async function getDashboardStats() {
    return apiRequest('/stats/dashboard');
}

async function getRecentTrades() {
    return apiRequest('/stats/trades/recent');
}

async function getBotPerformance(botId) {
    return apiRequest(`/stats/bot/${botId}/performance`);
}

// ===== BOT SWITCH ENDPOINT =====

async function switchBotCrypto(botId, newCrypto) {
    return apiRequest(`/bots/${botId}/switch-crypto`, {
        method: 'POST',
        body: JSON.stringify({ new_crypto: newCrypto })
    });
}