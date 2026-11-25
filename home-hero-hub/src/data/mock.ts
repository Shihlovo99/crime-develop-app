export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  specialty: string;
  distance: string;
  rate: number;
  rateUnit?: 'hour' | 'service';
  available: boolean;
  lat: number;
  lng: number;
  eta: string;
  completedJobs: number;
  verified: boolean;
}

export interface Job {
  id: string;
  service: string;
  provider: Provider;
  status: 'searching' | 'heading' | 'arrived' | 'in-progress' | 'completed';
  scheduledTime?: string;
  address: string;
  estimatedCost: number;
  notes?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: 'plumbing', name: 'Plumbing', icon: 'Wrench', color: 'bg-primary/10 text-primary', description: 'Leaks, clogs, installations' },
  { id: 'electrical', name: 'Electrical', icon: 'Zap', color: 'bg-warning/10 text-warning', description: 'Wiring, outlets, fixtures' },
  { id: 'mobile-mechanic', name: 'Mobile Mechanic', icon: 'CarFront', color: 'bg-warning/10 text-warning', description: 'Repairs and servicing at your location' },
  { id: 'car-detailing', name: 'Car Detailing', icon: 'Car', color: 'bg-primary/10 text-primary', description: 'Interior and exterior detailing' },
  { id: 'catering', name: 'Catering', icon: 'Utensils', color: 'bg-destructive/10 text-destructive', description: 'Food for gatherings and events' },
  { id: 'rubble-removal', name: 'Rubble Removal', icon: 'Trash2', color: 'bg-accent/10 text-accent', description: 'Construction waste and debris removal' },
  { id: 'handyman', name: 'Handyman', icon: 'Hammer', color: 'bg-accent/10 text-accent', description: 'Repairs, assembly, odd jobs' },
  { id: 'cleaning', name: 'Cleaning', icon: 'Sparkles', color: 'bg-primary/10 text-primary', description: 'Deep clean, regular service' },
  { id: 'mobile-car-wash', name: 'Mobile Car Wash', icon: 'Droplets', color: 'bg-success/10 text-success', description: 'Convenient at-home car washes' },
  { id: 'tyre-battery', name: 'Tyre & Battery Help', icon: 'Battery', color: 'bg-warning/10 text-warning', description: 'Flat tyres, jump-starts, replacements' },
  { id: 'vehicle-towing', name: 'Vehicle Towing', icon: 'Truck', color: 'bg-accent/10 text-accent', description: 'Roadside recovery and towing' },
  { id: 'event-planning', name: 'Event Planning', icon: 'PartyPopper', color: 'bg-primary/10 text-primary', description: 'Planning, setup and event support' },
  { id: 'moving-delivery', name: 'Moving & Delivery', icon: 'Move', color: 'bg-success/10 text-success', description: 'Furniture moves and item delivery' },
  { id: 'appliance-repair', name: 'Appliance Repair', icon: 'Refrigerator', color: 'bg-primary/10 text-primary', description: 'Repairs for household appliances' },
  { id: 'locksmith', name: 'Locksmith', icon: 'KeyRound', color: 'bg-warning/10 text-warning', description: 'Lockouts, repairs and installations' },
  { id: 'pool-maintenance', name: 'Pool Maintenance', icon: 'Waves', color: 'bg-primary/10 text-primary', description: 'Cleaning, servicing and repairs' },
  { id: 'window-gutter-cleaning', name: 'Window & Gutter Cleaning', icon: 'PanelsTopLeft', color: 'bg-success/10 text-success', description: 'Windows, gutters and downpipes' },
  { id: 'laundry', name: 'Laundry & Ironing', icon: 'Shirt', color: 'bg-accent/10 text-accent', description: 'Laundry collection and ironing' },
  { id: 'pet-grooming', name: 'Pet Grooming', icon: 'PawPrint', color: 'bg-warning/10 text-warning', description: 'At-home grooming for your pets' },
  { id: 'pet-sitting', name: 'Pet Sitting', icon: 'Dog', color: 'bg-success/10 text-success', description: 'Trusted care while you are away' },
  { id: 'tutoring', name: 'Tutoring', icon: 'GraduationCap', color: 'bg-primary/10 text-primary', description: 'One-to-one learning support' },
  { id: 'mobile-beauty', name: 'Mobile Beauty & Barber', icon: 'Scissors', color: 'bg-destructive/10 text-destructive', description: 'Hair and beauty services at home' },
  { id: 'tech-repair', name: 'Phone & Computer Repair', icon: 'Smartphone', color: 'bg-accent/10 text-accent', description: 'Device troubleshooting and repairs' },
  { id: 'photography', name: 'Photography', icon: 'Camera', color: 'bg-primary/10 text-primary', description: 'Portraits, events and property photos' },
  { id: 'security-cctv', name: 'Security & CCTV', icon: 'ShieldCheck', color: 'bg-warning/10 text-warning', description: 'Cameras, alarms and security systems' },
  { id: 'solar', name: 'Solar Services', icon: 'Sun', color: 'bg-success/10 text-success', description: 'Solar installation and maintenance' },
  { id: 'landscaping', name: 'Landscaping', icon: 'TreePine', color: 'bg-success/10 text-success', description: 'Lawn care, gardening, design' },
  { id: 'painting', name: 'Painting', icon: 'Paintbrush', color: 'bg-destructive/10 text-destructive', description: 'Interior & exterior painting' },
  { id: 'hvac', name: 'HVAC', icon: 'Wind', color: 'bg-primary/10 text-primary', description: 'Heating & cooling systems' },
  { id: 'pest', name: 'Pest Control', icon: 'Bug', color: 'bg-warning/10 text-warning', description: 'Removal & prevention' },
  { id: 'roofing', name: 'Roofing', icon: 'Home', color: 'bg-destructive/10 text-destructive', description: 'Repairs, installations' },
  { id: 'borehole', name: 'Borehole', icon: 'Droplets', color: 'bg-primary/10 text-primary', description: 'Drilling & maintenance' },
  { id: 'paving', name: 'Paving', icon: 'LayoutGrid', color: 'bg-accent/10 text-accent', description: 'Driveways, walkways' },
];

export const MOCK_PROVIDERS: Provider[] = [
  { id: '1', name: 'Marcus Johnson', avatar: 'MJ', rating: 4.9, reviews: 234, specialty: 'Plumbing', distance: '1.3 km', rate: 85, available: true, lat: 37.7849, lng: -122.4094, eta: '12 min', completedJobs: 1240, verified: true },
  { id: '2', name: 'Sarah Chen', avatar: 'SC', rating: 4.8, reviews: 189, specialty: 'Electrical', distance: '1.9 km', rate: 95, available: true, lat: 37.7799, lng: -122.4154, eta: '18 min', completedJobs: 890, verified: true },
  { id: '3', name: 'David Park', avatar: 'DP', rating: 4.7, reviews: 156, specialty: 'Handyman', distance: '2.4 km', rate: 65, available: true, lat: 37.7899, lng: -122.4024, eta: '22 min', completedJobs: 670, verified: true },
  { id: '4', name: 'Elena Rodriguez', avatar: 'ER', rating: 4.9, reviews: 312, specialty: 'Landscaping', distance: '3.4 km', rate: 75, available: true, lat: 37.7749, lng: -122.4194, eta: '28 min', completedJobs: 1580, verified: true },
  { id: '5', name: 'James Wright', avatar: 'JW', rating: 4.6, reviews: 98, specialty: 'Plumbing', distance: '0.8 km', rate: 80, available: false, lat: 37.7869, lng: -122.4064, eta: '8 min', completedJobs: 450, verified: true },
  ...[
    ['6', 'Aiden Foster', 'AF', 'Cleaning', 70],
    ['7', 'Mia Patel', 'MP', 'Mobile Mechanic', 110],
    ['8', 'Luca Williams', 'LW', 'Car Detailing', 85],
    ['9', 'Zara Khan', 'ZK', 'Mobile Car Wash', 55],
    ['10', 'Noah Smith', 'NS', 'Tyre & Battery Help', 90],
    ['11', 'Thabo Mokoena', 'TM', 'Vehicle Towing', 180],
    ['12', 'Lerato Dlamini', 'LD', 'Catering', 250],
    ['13', 'Chloe Adams', 'CA', 'Event Planning', 300],
    ['14', 'Sipho Ndlovu', 'SN', 'Rubble Removal', 220],
    ['15', 'Ethan Brown', 'EB', 'Moving & Delivery', 150],
    ['16', 'Olivia Jones', 'OJ', 'Appliance Repair', 95],
    ['17', 'Daniel Nkosi', 'DN', 'Locksmith', 100],
    ['18', 'Amara Singh', 'AS', 'Pool Maintenance', 75],
    ['19', 'Grace Wilson', 'GW', 'Window & Gutter Cleaning', 80],
    ['20', 'Theo van der Merwe', 'TV', 'Laundry & Ironing', 60],
    ['21', 'Nandi Khumalo', 'NK', 'Pet Grooming', 90],
    ['22', 'Ella Martin', 'EM', 'Pet Sitting', 65],
    ['23', 'Ben Carter', 'BC', 'Tutoring', 120],
    ['24', 'Ava Naidoo', 'AN', 'Mobile Beauty & Barber', 100],
    ['25', 'Kai Roberts', 'KR', 'Phone & Computer Repair', 110],
    ['26', 'Leila Jacobs', 'LJ', 'Photography', 350],
    ['27', 'Mandla Zulu', 'MZ', 'Security & CCTV', 140],
    ['28', 'Ruby Clarke', 'RC', 'Solar Services', 180],
    ['29', 'Caleb Moore', 'CM', 'Painting', 80],
    ['30', 'Sofia Botha', 'SB', 'HVAC', 120],
    ['31', 'Jabu Mahlangu', 'JM', 'Pest Control', 85],
    ['32', 'Leah Green', 'LG', 'Roofing', 150],
    ['33', 'Peter Dube', 'PD', 'Borehole', 200],
    ['34', 'Maya Taylor', 'MT', 'Paving', 130],
  ].map(([id, name, avatar, specialty, rate], index) => ({
    id: String(id),
    name: String(name),
    avatar: String(avatar),
    rating: 4.7 + (index % 3) * 0.1,
    reviews: 45 + index * 7,
    specialty: String(specialty),
    distance: `${(1 + (index % 8) * 0.4).toFixed(1)} km`,
    rate: Number(rate),
    rateUnit: 'service' as const,
    available: true,
    lat: 37.774 + (index % 6) * 0.003,
    lng: -122.421 + Math.floor(index / 6) * 0.004,
    eta: `${10 + (index % 6) * 4} min`,
    completedJobs: 120 + index * 31,
    verified: true,
  })),
];

export const MOCK_REVIEWS: Review[] = [
  { id: '1', author: 'Anna K.', rating: 5, comment: 'Marcus fixed our kitchen leak in under 30 minutes. Incredibly professional!', date: '2 days ago' },
  { id: '2', author: 'Tom B.', rating: 5, comment: 'Very thorough and explained everything. Fair pricing too.', date: '1 week ago' },
  { id: '3', author: 'Lisa M.', rating: 4, comment: 'Good work, arrived on time. Would recommend.', date: '2 weeks ago' },
];

export const MOCK_ACTIVE_JOB: Job = {
  id: 'job-1',
  service: 'Plumbing',
  provider: MOCK_PROVIDERS[0],
  status: 'heading',
  address: '742 Evergreen Terrace',
  estimatedCost: 120,
  notes: 'Kitchen sink leaking under cabinet',
};
