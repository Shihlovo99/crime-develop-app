import { Provider } from './mock';

export interface JobRequest {
  id: string;
  service: string;
  customer: string;
  address: string;
  distance: string;
  estimatedPay: number;
  urgency: 'now' | 'scheduled';
  scheduledTime?: string;
  description: string;
  postedAgo: string;
}

export interface ScheduleItem {
  id: string;
  service: string;
  customer: string;
  address: string;
  time: string;
  date: string;
  estimatedPay: number;
  status: 'confirmed' | 'pending';
}

export interface EarningsSummary {
  today: number;
  thisWeek: number;
  thisMonth: number;
  totalJobs: number;
  avgRating: number;
  completionRate: number;
  weeklyData: { day: string; amount: number }[];
}

export const MOCK_JOB_REQUESTS: JobRequest[] = [
  { id: 'jr-1', service: 'Plumbing', customer: 'Anna K.', address: '742 Evergreen Terrace', distance: '0.8 mi', estimatedPay: 120, urgency: 'now', description: 'Kitchen sink leaking under cabinet, water pooling on floor', postedAgo: '2 min ago' },
  { id: 'jr-2', service: 'Electrical', customer: 'Tom B.', address: '15 Oak Avenue', distance: '1.4 mi', estimatedPay: 150, urgency: 'now', description: 'Multiple outlets not working in living room', postedAgo: '5 min ago' },
  { id: 'jr-3', service: 'Roofing', customer: 'Lisa M.', address: '88 Pine Street', distance: '2.1 mi', estimatedPay: 350, urgency: 'scheduled', scheduledTime: 'Mar 12, 10:00 AM', description: 'Roof leak above bedroom, need inspection and repair', postedAgo: '12 min ago' },
  { id: 'jr-4', service: 'Paving', customer: 'James W.', address: '204 Maple Drive', distance: '3.0 mi', estimatedPay: 500, urgency: 'scheduled', scheduledTime: 'Mar 14, 9:00 AM', description: 'Driveway resurfacing, approximately 40sqm', postedAgo: '25 min ago' },
  { id: 'jr-5', service: 'Borehole', customer: 'Sarah P.', address: '67 River Road', distance: '4.2 mi', estimatedPay: 800, urgency: 'scheduled', scheduledTime: 'Mar 15, 8:00 AM', description: 'New borehole drilling for residential property', postedAgo: '1 hr ago' },
];

export const MOCK_SCHEDULE: ScheduleItem[] = [
  { id: 'sc-1', service: 'Plumbing', customer: 'Mark D.', address: '33 Cedar Lane', time: '9:00 AM', date: 'Today', estimatedPay: 95, status: 'confirmed' },
  { id: 'sc-2', service: 'Plumbing', customer: 'Diana R.', address: '120 Birch St', time: '2:00 PM', date: 'Today', estimatedPay: 110, status: 'confirmed' },
  { id: 'sc-3', service: 'Electrical', customer: 'Kevin L.', address: '8 Elm Court', time: '10:00 AM', date: 'Tomorrow', estimatedPay: 180, status: 'pending' },
  { id: 'sc-4', service: 'Roofing', customer: 'Lisa M.', address: '88 Pine Street', time: '10:00 AM', date: 'Mar 12', estimatedPay: 350, status: 'confirmed' },
];

export const MOCK_EARNINGS: EarningsSummary = {
  today: 205,
  thisWeek: 1240,
  thisMonth: 4850,
  totalJobs: 47,
  avgRating: 4.9,
  completionRate: 98,
  weeklyData: [
    { day: 'Mon', amount: 180 },
    { day: 'Tue', amount: 250 },
    { day: 'Wed', amount: 120 },
    { day: 'Thu', amount: 310 },
    { day: 'Fri', amount: 175 },
    { day: 'Sat', amount: 205 },
    { day: 'Sun', amount: 0 },
  ],
};
