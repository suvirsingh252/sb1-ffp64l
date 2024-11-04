import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  ClipboardList,
  Workflow,
  ChevronDown,
  GraduationCap,
  Cog
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { UserRole } from '../../types/auth';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const navigation: NavItem[] = [
  {
    name: 'Dashboard',
    path: '/',
    icon: <LayoutDashboard className="h-5 w-5" />,
    roles: ['ADMIN', 'ENERGY_ADVISOR', 'BOOKING_AGENT', 'TECH_TEAM', 'TRAINEE']
  },
  {
    name: 'EA Dashboard',
    path: '/ea-dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    roles: ['ADMIN', 'ENERGY_ADVISOR']
  },
  {
    name: 'Booking Dashboard',
    path: '/booking-dashboard',
    icon: <Calendar className="h-5 w-5" />,
    roles: ['ADMIN', 'BOOKING_AGENT']
  },
  {
    name: 'Tech Dashboard',
    path: '/tech-dashboard',
    icon: <Workflow className="h-5 w-5" />,
    roles: ['ADMIN', 'TECH_TEAM']
  },
  {
    name: 'Training Resources',
    path: '/training-resources',
    icon: <GraduationCap className="h-5 w-5" />,
    roles: ['ADMIN', 'TRAINEE']
  },
  {
    name: 'Participants',
    path: '/participants',
    icon: <Users className="h-5 w-5" />,
    roles: ['ADMIN', 'BOOKING_AGENT', 'ENERGY_ADVISOR']
  },
  {
    name: 'Admin Settings',
    path: '/admin-settings',
    icon: <Cog className="h-5 w-5" />,
    roles: ['ADMIN']
  }
];

interface SidebarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export default function Sidebar({ currentRole, onRoleChange }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const roleLabels: Record<UserRole, string> = {
    'ADMIN': 'Administrator',
    'ENERGY_ADVISOR': 'Energy Advisor',
    'BOOKING_AGENT': 'Booking Agent',
    'TECH_TEAM': 'Tech Team',
    'TRAINEE': 'Trainee'
  };

  const filteredNavigation = navigation.filter(item => 
    currentRole === 'ADMIN' || item.roles.includes(currentRole)
  );

  return (
    <div className="h-full bg-white border-r border-gray-200 w-64 flex flex-col">
      {currentRole === 'ADMIN' && (
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <button
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100"
            >
              <span>Viewing as: {roleLabels[currentRole]}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {isRoleMenuOpen && (
              <div className="absolute w-full mt-2 py-1 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                {Object.entries(roleLabels).map(([role, label]) => (
                  <button
                    key={role}
                    onClick={() => {
                      onRoleChange(role as UserRole);
                      setIsRoleMenuOpen(false);
                    }}
                    className={cn(
                      'w-full text-left px-4 py-2 text-sm hover:bg-gray-50',
                      role === currentRole ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <nav className="flex-1 p-4 space-y-1">
        {filteredNavigation.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              'w-full flex items-center px-3 py-2 text-sm font-medium rounded-md',
              location.pathname === item.path
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            )}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}