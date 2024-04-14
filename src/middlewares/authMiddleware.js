// Función para verificar si hay un usuario autenticado en la sesión
export const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

// Función para verificar si ya hay un usuario autenticado y redirigir al inicio
export const checkExistingUser = (req, res, next) => {
    if (req.session.user && (req.path === '/login' || req.path === '/register')) {
        return res.redirect('/');
    }
    next();
};
