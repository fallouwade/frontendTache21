import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUsersGear, FaUserTie } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
<<<<<<< HEAD:src/Composants/admin/NavbarAside/Sidebar.jsx
import { BiSolidCategoryAlt } from "react-icons/bi";
// import { MdHomeRepairService } from "react-icons/md";
// import { CgComment } from "react-icons/cg";
=======
// import { MdHomeRepairService } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
>>>>>>> e79dab537980d1dcbe814eab8d86bbcb6299c1e3:src/Composants/adminComposants/NavbarAside/Sidebar.jsx

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('dashboard');

  useEffect(() => {
    const currentPath = location.pathname;
    const currentMenuItem = menuItems.find(item => item.route === currentPath);
    if (currentMenuItem) {
      setActiveLink(currentMenuItem.id);
    } else if (currentPath === '/') {
      setActiveLink('dashboard');
    }
  }, [location]);

  const linkStyle = (linkName) => `
    flex gap-3 text-left px-4 py-2 items-center text-blue-100 
    hover:bg-gray-400 hover:text-gray-100 cursor-pointer
    ${activeLink === linkName ? 'bg-gray-400 text-white border-r-8 border-blue-600' : ''}
  `;

  const menuItems = [
    { id: 'dashboard', icon: <RxDashboard />, label: 'Dashboard', route: '/' },
    { id: 'prestataires', icon: <FaUserTie />, label: 'Prestataires', route: '/prestataire' },
    { id: 'clients', icon: <FaUsersGear />, label: 'Clients', route: '/clients' },
    // { id: 'services', icon: <MdHomeRepairService />, label: 'Services', route: '/services' },
    // { id: 'avis', icon: <CgComment />, label: 'Avis', route: '/avis' },
    { id: 'categories', icon: <BiSolidCategoryAlt />, label: 'Catégories', route: '/categories' }
  ];

  return (
    <aside
      className={`fixed lg:relative top-16 left-0 bg-[#0A2342] z-50 min-h-10/12 transform 
        ${isOpen ? 'translate-x-0 w-72' : '-translate-x-full'} lg:translate-x-0`}
    >
      <div className="flex flex-col pt-5 w-full">
        {menuItems.map((item) => (
          <div key={item.id} className="w-full mb-4">
            <Link
              to={item.route}
              onClick={() => setActiveLink(item.id)}
              className={linkStyle(item.id)}
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