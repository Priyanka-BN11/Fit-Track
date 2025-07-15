import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Activity, User } from 'lucide-react'; // assuming lucide-react for icons

const Navbar = () => (
  <div className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
    <h2 className="text-xl font-bold text-gray-800">Fitness Tracker</h2>
    <nav className="flex space-x-6">
      <NavItem to="/progressdashboard" icon={<Home size={20} />} label="Dashboard" />
      <NavItem to="/logactivity" icon={<Activity size={20} />} label="Log Activity" />
      <NavItem to="/userprofile" icon={<User size={20} />} label="Profile" />
    </nav>
  </div>
);

const NavItem = ({ icon, label, to }: { icon: React.ReactNode; label: string; to: string }) => (
  <Link
    to={to}
    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Navbar;
