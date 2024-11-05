import { jwtDecode } from "jwt-decode";
export const authService = {
    setToken(token) {
        try {
            const decodedToken = jwtDecode(token);

            localStorage.setItem('authToken', token);
            localStorage.setItem('tokenData', JSON.stringify(decodedToken));

            return decodedToken;
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            this.removeToken();
            return null;
        }
    },

    getToken() {
        const token = localStorage.getItem('authToken');
        if (!token) return null;

        try {
            const decodedToken = jwtDecode(token);

            if (decodedToken.exp * 1000 < Date.now()) {
                this.removeToken();
                return null;
            }

            return token;
        } catch {
            this.removeToken();
            return null;
        }
    },

    getTokenInfo() {
        const token = this.getToken();
        if (!token) return null;

        try {
            return jwtDecode(token);
        } catch {
            return null;
        }
    },

    getUserId() {
        const tokenInfo = this.getTokenInfo();
        return tokenInfo?.id || null;
    },

    getUserName() {
        const tokenInfo = this.getTokenInfo();
        return tokenInfo?.username || null;
    },

    getUserEmail() {
        const tokenInfo = this.getTokenInfo();
        return tokenInfo?.email || null;
    },

    getUserRole() {
        const tokenInfo = this.getTokenInfo();
        return tokenInfo?.role || null;
    },

    getExpirationTime() {
        const tokenInfo = this.getTokenInfo();
        return tokenInfo?.exp ? new Date(tokenInfo.exp * 1000) : null;
    },

    removeToken() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenData');
    },

    isAuthenticated() {
        return !!this.getToken();
    }
};