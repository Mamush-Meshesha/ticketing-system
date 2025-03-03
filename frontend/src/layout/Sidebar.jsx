import { Ticket, Home, Settings, Users, LogOut, Menu, X, User, ChevronDown, ChevronUp, PowerOffIcon, PilcrowLeftIcon, PickaxeIcon, UserPen, User2Icon } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toggleSidebar } from '../stores/redux/state';
import { logoutRequest } from '../stores/redux/auth';
const Sidebar = () => {
    // const { user, logout, setRole } = useAuth();
    const [showRoleSelector,setShowRoleSelector] = useState(false);
    // const [user, setUser] = useState({ role: "admin", name: "John Doe", avatarUrl: "" });
    const USER_ROLES = {}
    const location = useLocation();

    const naviagte = useNavigate();
    const dispatch = useDispatch();
    const isSidebarCollapsed = useSelector((state) => state.sidebar.isSidebarCollapsed);
    const user = useSelector((state) => state.auth.user);


    const logout = () => {
      dispatch(logoutRequest())
      naviagte("/login")
    }

    const mainbuttons = [
        { 
          to: '/dashboard', 
          label: 'Dashboard', 
          icon: <Home className="w-5 h-5" />,
          permissions: ['admin', 'user']
        },
        { 
          to: '/tickets', 
          label: 'Tickets', 
          icon: <Ticket className="w-5 h-5" />,
          permissions: ['admin', 'user']
        },
        { 
          to: '/users', 
          label: 'Users', 
          icon: <Users className="w-5 h-5" />,
          permissions: ['admin']
        },
        { 
          to: '/settings', 
          label: 'Settings', 
          icon: <Settings className="w-5 h-5" />,
          permissions: ['admin']
        }
      ];

      const filteredbuttons = mainbuttons.filter(button => 
        user && button.permissions.includes(user.role)
      );
      const isActive = (path) => location.pathname === path;

  return (
    <div>
  <div
    className={`
      fixed top-0 left-0 h-full bg-[#2d3443] text-white z-40
      transition-all duration-300 ease-in-out shadow-lg
      ${isSidebarCollapsed ? "w-16" : "w-64"}
    `}
  >
    <div className="h-full flex flex-col">
      {/* Sidebar header */}
      <div className="h-16 flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isSidebarCollapsed && (
          <button to="/dashboard" className="flex bg-[#2d3443]! items-center  space-x-2">
            <Ticket  className="w-6 h-6  text-blue-400" />
            <span className="font-semibold text-lg">TicketFlow</span>
          </button>
        )}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="rounded-md p-1.5 bg-[#2d3443]! hover:bg-sidebar-accent"
        >
          {isSidebarCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation buttons */}
      <div className="flex-1 py-6 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {filteredbuttons.map((button) => (
            <Link
              key={button.to}
              to={button.to}
              className={`
                flex items-center px-3 py-2 bg-[#2d3443]! rounded-lg transition-colors
                ${isActive(button.to) ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50"}
                ${isSidebarCollapsed ? "justify-center" : "justify-start"}
              `}
            >
              <span className={isSidebarCollapsed ? "" : "mr-3"}>{button.icon}</span>
              {!isSidebarCollapsed && <span>{button.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* User section */}
      <div className="p-3 border-t border-sidebar-border">
        {user && (
          <div
            className={`
              flex items-center relative
              ${isSidebarCollapsed ? "justify-center" : "justify-between"}
            `}
          >
            <div
              className={`
                flex items-center cursor-pointer
                ${isSidebarCollapsed ? "" : "space-x-3"}
              `}
              onClick={() => !isSidebarCollapsed && setShowRoleSelector(!showRoleSelector)}
            >
              <div className="h-8 w-8 ">
                <User2Icon src={user.avatarUrl || ""} alt={user.name} />
              </div>
              {!isSidebarCollapsed && (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-sidebar-foreground/70 truncate">
                      {USER_ROLES[user.role]}
                    </p>
                  </div>
                  <div className="ml-2">
                    {showRoleSelector ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </>
              )}
            </div>

            {/* Logout button (only when isSidebarCollapsed) */}
            {isSidebarCollapsed && (
              <button
               
                className="mt-3 p-2 rounded-full hover:bg-sidebar-accent/50"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}

            {/* Role selector dropdown */}
            {!isSidebarCollapsed && showRoleSelector && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-sidebar-accent rounded-md shadow-md p-1 z-10 animate-fade-in">
                <p className="text-xs px-2 py-1 text-sidebar-foreground/70">Switch role (Demo)</p>
                <button
                  onClick={() => { setRole("admin"); setShowRoleSelector(false); }}
                  className="flex items-center w-full px-2 py-1.5 bg-[#2d3443]! text-sm rounded hover:bg-sidebar-primary/50"
                >
                  <User className="w-4 h-4 mr-2" />
                  Admin
                </button>
                <button
                  onClick={() => { setRole("agent"); setShowRoleSelector(false); }}
                  className="flex items-center w-full px-2 py-1.5 bg-[#2d3443]! text-sm rounded hover:bg-sidebar-primary/50"
                >
                  <User className="w-4 h-4 mr-2" />
                  user
                </button>
               
                <div className="border-t border-sidebar-border my-1"></div>
                <button
                  onClick={logout}
                  className="flex items-center w-full px-2 py-1.5 bg-[#2d3443]! text-sm rounded hover:bg-sidebar-primary/50 text-red-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
</div>

  );
}

export default Sidebar;