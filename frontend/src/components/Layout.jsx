import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-foliance-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="text-white font-bold text-xl">
                Foliance
              </Link>
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <Link
                    to="/dashboard"
                    className="text-white hover:bg-foliance-blue-dark px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/editor"
                    className="text-white hover:bg-foliance-blue-dark px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Editor
                  </Link>
                  <Link
                    to={`/profile/${user?.username}`}
                    className="text-white hover:bg-foliance-blue-dark px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Public Profile
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <button
                  onClick={handleLogout}
                  className="bg-foliance-orange hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/dashboard"
            className="text-white hover:bg-foliance-blue-dark block px-3 py-2 rounded-md text-base font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/editor"
            className="text-white hover:bg-foliance-blue-dark block px-3 py-2 rounded-md text-base font-medium"
          >
            Editor
          </Link>
          <Link
            to={`/profile/${user?.username}`}
            className="text-white hover:bg-foliance-blue-dark block px-3 py-2 rounded-md text-base font-medium"
          >
            Public Profile
          </Link>
        </div>
      </div>

      {/* Main content */}
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
