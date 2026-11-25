import { cn } from '@/lib/utils';
import { ServiceCategory } from '@/data/mock';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  category: ServiceCategory;
  onClick: (id: string) => void;
}

const ServiceCategoryCard = ({ category, onClick }: Props) => {
  const IconComponent = (Icons as any)[category.icon] || Icons.Wrench;

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(category.id)}
      className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-shadow duration-200"
    >
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", category.color)}>
        <IconComponent size={24} />
      </div>
      <span className="text-sm font-semibold text-foreground">{category.name}</span>
      <span className="text-[11px] text-muted-foreground text-center leading-tight">{category.description}</span>
    </motion.button>
  );
};

export default ServiceCategoryCard;
