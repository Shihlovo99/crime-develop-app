import { Review } from '@/data/mock';
import { Star } from 'lucide-react';

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="p-3 bg-secondary rounded-xl">
    <div className="flex items-center justify-between mb-1">
      <span className="text-sm font-semibold text-foreground">{review.author}</span>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={12} className={i < review.rating ? "text-warning fill-warning" : "text-muted"} />
        ))}
      </div>
    </div>
    <p className="text-xs text-muted-foreground leading-relaxed">{review.comment}</p>
    <p className="text-[10px] text-muted-foreground mt-1">{review.date}</p>
  </div>
);

export default ReviewCard;
