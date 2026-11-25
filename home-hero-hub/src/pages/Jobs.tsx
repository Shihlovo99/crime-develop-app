import { MOCK_ACTIVE_JOB, MOCK_REVIEWS } from '@/data/mock';
import ActiveJobCard from '@/components/ActiveJobCard';
import ReviewCard from '@/components/ReviewCard';
import { ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const tabs = [
  { id: 'active', label: 'Active', icon: Clock },
  { id: 'completed', label: 'Completed', icon: CheckCircle2 },
];

const Jobs = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('active');

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-30 bg-background border-b border-border px-5 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground flex-1">My Jobs</h1>
          <button
            onClick={() => navigate('/dev/simulator')}
            className="text-[10px] font-semibold px-2.5 py-1.5 rounded-full bg-secondary text-muted-foreground hover:text-foreground"
            title="Developer: simulate concurrent live jobs"
          >
            DEV
          </button>
        </div>
        <div className="flex gap-2">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all",
                tab === t.id ? "gradient-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              )}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-4 space-y-4">
        {tab === 'active' ? (
          <>
            <ActiveJobCard job={MOCK_ACTIVE_JOB} />
            <p className="text-center text-sm text-muted-foreground pt-4">No other active jobs</p>
          </>
        ) : (
          <div className="space-y-4">
            {/* Completed job summary */}
            <div className="p-4 bg-card rounded-2xl shadow-card">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-foreground">Electrical Repair</h3>
                  <p className="text-xs text-muted-foreground">Sarah Chen • Mar 2, 2026</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-success text-success-foreground">Completed</span>
              </div>
              <div className="flex justify-between text-sm border-t border-border pt-2">
                <span className="text-muted-foreground">Total paid</span>
                <span className="font-bold text-foreground">$195.00</span>
              </div>
            </div>

            <h3 className="font-bold text-foreground mt-4">Recent Reviews</h3>
            {MOCK_REVIEWS.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
