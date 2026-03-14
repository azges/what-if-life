import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Simulator, categories } from '@/data/simulators';

interface Props {
  simulator: Simulator;
  index?: number;
}

const SimulatorCard = ({ simulator, index = 0 }: Props) => {
  const category = categories.find(c => c.slug === simulator.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.2, 0, 0, 1] }}
    >
      <Link to={`/simulator/${simulator.slug}`}>
        <motion.div
          className="group rounded-lg p-6 shadow-card bg-card transition-shadow duration-200 hover:shadow-card-hover h-full flex flex-col"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md">
              {category?.icon} {category?.name}
            </span>
            {simulator.isTrending && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                <TrendingUp className="w-3 h-3" /> Trending
              </span>
            )}
          </div>
          <h3 className="text-base font-semibold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
            {simulator.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-2">
            {simulator.description}
          </p>
          <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Simulate <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default SimulatorCard;
