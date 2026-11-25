import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, CheckCircle2, Star, DollarSign, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MOCK_PROVIDERS } from '@/data/mock';
import { toast } from 'sonner';

type Step = 'summary' | 'payment' | 'processing' | 'complete' | 'review';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState<Step>('summary');
  const [tipPercent, setTipPercent] = useState<number>(15);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const provider = location.state?.provider ?? MOCK_PROVIDERS[0];
  const scheduledTime = location.state?.scheduledTime as string | null;
  const hours = 1.5;
  const serviceFee = provider.rateUnit === 'service' ? provider.rate : provider.rate * hours;
  const platformFee = 5;
  const tip = Math.round(serviceFee * tipPercent / 100);
  const total = serviceFee + platformFee + tip;

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => setStep('complete'), 2000);
  };

  const handleReviewSubmit = () => {
    toast.success('Review submitted! Thank you.');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background border-b border-border px-5 pt-12 pb-4 flex items-center gap-3">
        {step === 'summary' && (
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
        )}
        <h1 className="text-xl font-bold text-foreground">
          {step === 'complete' || step === 'review' ? 'Job Complete' : 'Checkout'}
        </h1>
      </div>

      <div className="px-5 py-6">
        <AnimatePresence mode="wait">
          {step === 'summary' && (
            <motion.div key="summary" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
              {/* Provider */}
              <div className="flex items-center gap-4 p-4 bg-secondary rounded-2xl">
                <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">{provider.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-foreground">{provider.name}</h3>
                    <Shield size={14} className="text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">{provider.specialty} • {scheduledTime ? `Scheduled ${scheduledTime}` : provider.rateUnit === 'service' ? 'One-time service' : `${hours} hrs`}</p>
                </div>
              </div>

              {/* Cost breakdown */}
              <div className="p-4 bg-secondary rounded-2xl space-y-3">
                <h3 className="font-semibold text-foreground">Cost Breakdown</h3>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">{provider.rateUnit === 'service' ? 'Service fee' : `Service (${hours} hrs × R${provider.rate})`}</span><span className="text-foreground">R{serviceFee.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Platform fee</span><span className="text-foreground">R{platformFee.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Tip ({tipPercent}%)</span><span className="text-foreground">R{tip.toFixed(2)}</span></div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-bold text-lg text-foreground">R{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Tip selector */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Add a Tip</h3>
                <div className="flex gap-2">
                  {[0, 10, 15, 20, 25].map(pct => (
                    <button
                      key={pct}
                      onClick={() => setTipPercent(pct)}
                      className={cn(
                        "flex-1 py-3 rounded-xl text-sm font-semibold transition-all",
                        tipPercent === pct ? "gradient-primary text-primary-foreground shadow-elevated" : "bg-secondary text-secondary-foreground"
                      )}
                    >
                      {pct === 0 ? 'None' : `${pct}%`}
                    </button>
                  ))}
                </div>
              </div>

              <Button className="w-full h-14 rounded-2xl gradient-primary text-primary-foreground text-base font-bold shadow-elevated" onClick={() => setStep('payment')}>
                Continue to Payment
              </Button>
            </motion.div>
          )}

          {step === 'payment' && (
            <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div className="p-4 bg-secondary rounded-2xl space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2"><CreditCard size={18} className="text-primary" /> Payment Method</h3>

                {/* Mock saved card */}
                <div className="p-4 border-2 border-primary rounded-xl bg-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-7 rounded bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">VISA</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">•••• •••• •••• 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/27</p>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    </div>
                  </div>
                </div>

                {/* Add card option */}
                <button className="w-full p-3 border border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                  + Add new card
                </button>
              </div>

              <div className="p-4 bg-secondary rounded-2xl flex justify-between items-center">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-xl text-foreground">R{total.toFixed(2)}</span>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 h-14 rounded-2xl" onClick={() => setStep('summary')}>Back</Button>
                <Button className="flex-[2] h-14 rounded-2xl gradient-primary text-primary-foreground text-base font-bold shadow-elevated" onClick={handlePay}>
                  <DollarSign size={18} className="mr-1" /> Pay R{total.toFixed(2)}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'processing' && (
            <motion.div key="processing" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-20 space-y-6">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }} className="w-16 h-16 rounded-full border-4 border-secondary border-t-primary" />
              <p className="text-lg font-semibold text-foreground">Processing payment...</p>
              <p className="text-sm text-muted-foreground">Please don't close this page</p>
            </motion.div>
          )}

          {step === 'complete' && (
            <motion.div key="complete" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-12 space-y-6">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                <div className="w-20 h-20 rounded-full gradient-accent flex items-center justify-center shadow-elevated">
                  <CheckCircle2 size={40} className="text-accent-foreground" />
                </div>
              </motion.div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Payment Successful!</h2>
                <p className="text-muted-foreground">R{total.toFixed(2)} paid to {provider.name}</p>
              </div>
              <div className="w-full p-4 bg-secondary rounded-2xl space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Transaction ID</span><span className="font-medium text-foreground">#FIX-{Date.now().toString().slice(-6)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium text-foreground">{provider.specialty}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{scheduledTime ? 'Appointment' : 'Duration'}</span><span className="font-medium text-foreground">{scheduledTime ?? (provider.rateUnit === 'service' ? 'One-time service' : `${hours} hours`)}</span></div>
              </div>
              <Button className="w-full h-14 rounded-2xl gradient-primary text-primary-foreground text-base font-bold shadow-elevated" onClick={() => setStep('review')}>
                Rate {provider.name}
              </Button>
            </motion.div>
          )}

          {step === 'review' && (
            <motion.div key="review" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">{provider.avatar}</div>
                <h2 className="text-lg font-bold text-foreground">How was {provider.name}?</h2>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} onClick={() => setRating(star)}>
                      <Star size={36} className={cn("transition-all", star <= rating ? "text-warning fill-warning scale-110" : "text-border")} />
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                placeholder="Tell us about your experience..."
                className="w-full h-28 p-4 bg-secondary rounded-2xl text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none focus:ring-2 focus:ring-primary"
              />
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 h-14 rounded-2xl" onClick={() => navigate('/')}>Skip</Button>
                <Button className="flex-[2] h-14 rounded-2xl gradient-primary text-primary-foreground text-base font-bold shadow-elevated" onClick={handleReviewSubmit} disabled={rating === 0}>
                  Submit Review
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Checkout;
