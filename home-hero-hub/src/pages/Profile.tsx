import { ArrowLeft, Settings, Star, MapPin, Shield, ChevronRight, LogOut, CreditCard, HelpCircle, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const MENU_ITEMS = [
  { icon: CreditCard, label: 'Payment Methods', desc: 'Manage your cards' },
  { icon: MapPin, label: 'Saved Addresses', desc: '2 addresses saved' },
  { icon: Bell, label: 'Notifications', desc: 'Manage preferences' },
  { icon: HelpCircle, label: 'Help & Support', desc: 'FAQ, contact us' },
  { icon: Settings, label: 'Settings', desc: 'Account, privacy' },
];

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="gradient-primary px-5 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <ArrowLeft size={20} className="text-primary-foreground" />
          </button>
          <h1 className="text-xl font-bold text-primary-foreground">Profile</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground font-bold text-xl">
            JD
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-primary-foreground">John Doe</h2>
            <p className="text-sm text-primary-foreground/70">john.doe@email.com</p>
            <div className="flex items-center gap-1 mt-1">
              <Star size={14} className="text-warning fill-warning" />
              <span className="text-sm text-primary-foreground/80">4.9 rating • 12 bookings</span>
            </div>
          </div>
          <Shield size={20} className="text-primary-foreground/50" />
        </div>
      </div>

      {/* Role toggle */}
      <div className="px-5 -mt-4 mb-4">
        <div className="flex gap-2 p-1.5 bg-card rounded-2xl shadow-elevated">
          <button className="flex-1 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold">
            Customer
          </button>
          <button
            onClick={() => navigate('/pro')}
            className="flex-1 py-2.5 rounded-xl text-muted-foreground text-sm font-medium hover:bg-secondary transition-colors"
          >
            Pro Mode
          </button>
        </div>
      </div>

      {/* Menu */}
      <div className="px-5 space-y-2">
        {MENU_ITEMS.map(item => (
          <button
            key={item.label}
            className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl shadow-card hover:shadow-elevated transition-shadow"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <item.icon size={20} className="text-foreground" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
        ))}

        <button className="w-full flex items-center gap-4 p-4 rounded-2xl text-destructive hover:bg-destructive/5 transition-colors mt-4">
          <LogOut size={20} />
          <span className="text-sm font-semibold">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
