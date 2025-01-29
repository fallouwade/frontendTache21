// Fonction pour verifier si l'utilisateur est authentifié
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };
  
//  Fonction pour réccuperer le rôle de l'utilisateur stocké 
  export const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role;
  };
  

  export const checkPermission = (allowedRoles) => {
    const userRole = getUserRole();
    return allowedRoles.includes(userRole);
  };

//   Fonction pour ajouter le token et l'utilisateur dans le localstorage
  export const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
//   Fonction pour les donnée d'utilisateurs sur localStorage
  export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };