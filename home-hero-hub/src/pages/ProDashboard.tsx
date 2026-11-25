import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Briefcase, Calendar, DollarSign, Star, TrendingUp, CheckCircle2, Clock, MapPin, Zap, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MOCK_JOB_REQUESTS, MOCK_SCHEDULE, MOCK_EARNINGS, JobRequest } from '@/data/proMock';
import { toast } from 'sonner';

const tabs = [
  { id: 'feed', label: 'Job Feed', icon: Briefcase },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'earnings', label: 'Earnings', icon: DollarSign },
];

const ProDashboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('feed');
  const [jobs, setJobs] = useState(MOCK_JOB_REQUESTS);

  const handleAccept = (id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id));
    toast.success('Job accepted! Check your schedule.');
  };

  const handleDecline = (id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id));
    toast('Job declined');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="gradient-primary px-5 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <ArrowLeft size={20} className="text-primary-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-primary-foreground">Pro Dashboard</h1>
            <p className="text-sm text-primary-foreground/70">Marcus Johnson</p>
          </div>
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary-foreground/20">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-semibold text-primary-foreground">Online</span>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Today', value: `R${MOCK_EARNINGS.today}`, icon: DollarSign },
            { label: 'Jobs', value: MOCK_EARNINGS.totalJobs, icon: Briefcase },
            { label: 'Rating', value: MOCK_EARNINGS.avgRating, icon: Star },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col items-center p-3 rounded-xl bg-primary-foreground/10">
              <stat.icon size={16} className="text-primary-foreground/70 mb-1" />
              <span className="text-lg font-bold text-primary-foreground">{stat.value}</span>
              <span className="text-[10px] text-primary-foreground/60">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-30 bg-background border-b border-border px-5 py-3">
        <div className="flex gap-2">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-all",
                tab === t.id ? "gradient-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              )}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-4">
        {tab === 'feed' && <JobFeed jobs={jobs} onAccept={handleAccept} onDecline={handleDecline} />}
        {tab === 'schedule' && <ScheduleView />}
        {tab === 'earnings' && <EarningsView />}
      </div>
    </div>
  );
};

/* ─── Job Feed ──────────────────────────────── */
const JobFeed = ({ jobs, onAccept, onDecline }: { jobs: JobRequest[]; onAccept: (id: string) => void; onDecline: (id: string) => void }) => (
  <div className="space-y-3">
    {jobs.length === 0 ? (
      <div className="text-center py-12">
        <Briefcase size={40} className="text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground font-medium">No pending requests</p>
        <p className="text-sm text-muted-foreground/70">New jobs will appear here</p>
      </div>
    ) : (
      jobs.map((job, i) => (
        <motion.div
          key={job.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="p-4 bg-card rounded-2xl shadow-card"
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-foreground">{job.service}</h3>
                {job.urgency === 'now' && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-[10px] font-bold">
                    <Zap size={10} /> URGENT
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{job.customer} • {job.postedAgo}</p>
            </div>
            <span className="text-lg font-extrabold text-success">R{job.estimatedPay}</span>
          </div>

          <p className="text-sm text-foreground/80 mb-3">{job.description}</p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1"><MapPin size={12} />{job.distance}</span>
            {job.scheduledTime && <span className="flex items-center gap-1"><Clock size={12} />{job.scheduledTime}</span>}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onAccept(job.id)}
              className="flex-1 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold"
            >
              Accept
            </button>
            <button
              onClick={() => onDecline(job.id)}
              className="flex-1 py-2.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-semibold"
            >
              Decline
            </button>
          </div>
        </motion.div>
      ))
    )}
  </div>
);

/* ─── Schedule View ─────────────────────────── */
const ScheduleView = () => {
  const grouped = MOCK_SCHEDULE.reduce((acc, item) => {
    (acc[item.date] = acc[item.date] || []).push(item);
    return acc;
  }, {} as Record<string, typeof MOCK_SCHEDULE>);

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([date, items]) => (
        <div key={date}>
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Calendar size={14} className="text-primary" />
            {date}
          </h3>
          <div className="space-y-2">
            {items.map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-3 bg-card rounded-xl shadow-card"
              >
                <div className="w-14 text-center">
                  <span className="text-sm font-bold text-primary">{item.time}</span>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{item.service}</p>
                  <p className="text-xs text-muted-foreground">{item.customer} • {item.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">R{item.estimatedPay}</p>
                  <span className={cn(
                    "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                    item.status === 'confirmed' ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                  )}>
                    {item.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ─── Earnings View ─────────────────────────── */
const EarningsView = () => {
  const maxAmount = Math.max(...MOCK_EARNINGS.weeklyData.map(d => d.amount));

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'This Week', value: `R${MOCK_EARNINGS.thisWeek.toLocaleString()}`, icon: TrendingUp, color: 'text-primary' },
          { label: 'This Month', value: `R${MOCK_EARNINGS.thisMonth.toLocaleString()}`, icon: DollarSign, color: 'text-success' },
          { label: 'Completion', value: `${MOCK_EARNINGS.completionRate}%`, icon: CheckCircle2, color: 'text-accent' },
          { label: 'Avg Rating', value: MOCK_EARNINGS.avgRating.toString(), icon: Star, color: 'text-warning' },
        ].map(card => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-card rounded-2xl shadow-card"
          >
            <card.icon size={18} className={cn("mb-2", card.color)} />
            <p className="text-xl font-extrabold text-foreground">{card.value}</p>
            <p className="text-xs text-muted-foreground">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="p-4 bg-card rounded-2xl shadow-card">
        <h3 className="text-sm font-bold text-foreground mb-4">Weekly Earnings</h3>
        <div className="flex items-end gap-2 h-32">
          {MOCK_EARNINGS.weeklyData.map(d => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] font-semibold text-muted-foreground">R{d.amount}</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.amount / maxAmount) * 100}%` }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full rounded-t-lg gradient-primary min-h-[4px]"
              />
              <span className="text-[10px] font-medium text-muted-foreground">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent transactions */}
      <div className="p-4 bg-card rounded-2xl shadow-card">
        <h3 className="text-sm font-bold text-foreground mb-3">Recent Payments</h3>
        <div className="space-y-3">
          {[
            { name: 'Kitchen sink repair', amount: 120, time: 'Today, 11:30 AM' },
            { name: 'Outlet installation', amount: 85, time: 'Today, 9:00 AM' },
            { name: 'Pipe replacement', amount: 250, time: 'Yesterday' },
          ].map((tx, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{tx.name}</p>
                <p className="text-xs text-muted-foreground">{tx.time}</p>
              </div>
              <span className="text-sm font-bold text-success">+R{tx.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProDashboard;
