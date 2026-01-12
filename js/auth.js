// LAZY.IO - Authentication Helper
// Gestion JWT et authentification

const AUTH_CONFIG = {
    API_BASE_URL: 'https://api.lazyio.xyz/api/v1',
    TOKEN_KEY: 'lazy_auth_token',
    USER_KEY: 'lazy_user_data'
};

// Sauvegarder le token après login/register
function saveAuth(token, userData) {
    localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, token);
    localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(userData));
}

// Récupérer le token
function getAuthToken() {
    return localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
}

// Récupérer les données user
function getUserData() {
    const data = localStorage.getItem(AUTH_CONFIG.USER_KEY);
    return data ? JSON.parse(data) : null;
}

// Vérifier si user est connecté
function isAuthenticated() {
    return !!getAuthToken();
}

// Se déconnecter
function logout() {
    localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
    localStorage.removeItem(AUTH_CONFIG.USER_KEY);
    window.location.href = 'index.html';
}

// Rediriger si pas authentifié
function requireAuth() {
    if (!isAuthenticated()) {
        alert('Vous devez vous connecter d\'abord');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Rediriger si déjà authentifié
function redirectIfAuthenticated() {
    if (isAuthenticated()) {
        window.location.href = 'dashboard.html';
    }
}