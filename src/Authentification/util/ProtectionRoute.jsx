import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated,getUserRole } from './Auth';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const isLoggedIn = isAuthenticated();
  const userRole = getUserRole();

  if (!isLoggedIn) {
    return <Navigate to="/connexion" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirection basée sur le rôle
    switch (userRole) {
      case 'CLIENT':
        return <Navigate to="/client" replace />;
      case 'PRESTATAIRE':
        return <Navigate to="/accueil" replace />;
      case 'ADMIN':
        return <Navigate to="/dashboardAdmin" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;