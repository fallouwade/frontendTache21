import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated,getUserRole } from './Auth';

const ProtectionRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const isLoggedIn = isAuthenticated();
  const userRole = getUserRole();

  if (!isLoggedIn) {
    return <Navigate to="/connexion" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirection basée sur le rôle
    switch (userRole) {
      case 'client':
        return <Navigate to="/Client" replace />;
      case 'prestataire':
        return <Navigate to="/dashboard" replace />;
      case 'admin':
        return <Navigate to="/dashboardAdmin" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectionRoute;