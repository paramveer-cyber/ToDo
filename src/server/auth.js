import { useAuth0 } from '@auth0/auth0-react';

export const useAuthFunctions = () => {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
    const isAuthenticatedUser = isAuthenticated;
    const domain = 'dev-xgi1ni6k23x87bgd.us.auth0.com';

    const handleLogin = () => {
        loginWithRedirect({ prompt: 'login' });
    };

    const handleLogout = () => {
        logout({ returnTo: window.location.origin });
    };

    return {
        handleLogin,
        handleLogout,
        isAuthenticated: isAuthenticatedUser,
        user,
    };
};
