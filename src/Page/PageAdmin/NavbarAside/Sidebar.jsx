import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUsersGear, FaUserTie } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { BiSolidCategoryAlt } from "react-icons/bi";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');

  const menuItems = [
    { id: 'dashboard', icon: <RxDashboard />, label: 'Dashboard', route: '/', basePath: '/' },
    { id: 'prestataires', icon: <FaUserTie />, label: 'Prestataires', route: '/prestataire', basePath: '/prestataire' },
    { id: 'clients', icon: <FaUsersGear />, label: 'Clients', route: '/clients', basePath: '/clients' },
    { id: 'categories', icon: <BiSolidCategoryAlt />, label: 'Catégories', route: '/categories', basePath: '/categories' }
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    console.log(activeLink);
    // Fonction pour vérifier si le chemin actuel correspond à une route de base
    const matchingItem = menuItems.find(item => {
      if (item.basePath === '/') {
        // Pour le dashboard, vérifier exactement la route '/'
        return currentPath === '/';
      }
      // Pour les autres routes, vérifier si le chemin commence par la route de base
      return currentPath.startsWith(item.basePath);
    });

    if (matchingItem) {
      setActiveLink(matchingItem.label);
    }
  }, [location.pathname]);

  const isLinkActive = (item) => {
    if (item.basePath === '/') {
      // Pour le dashboard, vérifier exactement la route '/'
      return location.pathname === '/';
    }
    // Pour les autres routes, vérifier si le chemin commence par la route de base
    return location.pathname.startsWith(item.basePath);
  };

  const linkStyle = (item) => `
    flex gap-3 text-left px-4 py-2 items-center text-blue-100 
    hover:bg-gray-400 hover:text-gray-100 cursor-pointer transition-all duration-200
    ${isLinkActive(item) ? 'bg-gray-400 text-white border-r-8 border-blue-600' : ''}
  `;

  return (
    <aside
      className={`fixed lg:relative top-16 left-0 bg-[#0A2342] z-50 min-h-10/12 transform 
        ${isOpen ? 'translate-x-0 w-72' : '-translate-x-full'} lg:translate-x-0 
        transition-transform duration-300`}
    >
      <div className="flex flex-col pt-5 w-full">
        {menuItems.map((item) => (
          <div key={item.id} className="w-full mb-4">
            <Link
              to={item.route}
              onClick={() => setActiveLink(item.label)}
              className={linkStyle(item)}
            >
              <span className='text-xl'>
                {item.icon}
              </span>
              <span className="text-xl">
                {item.label}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;