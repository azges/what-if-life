import { motion } from 'framer-motion';
import { formatNumber } from '@/lib/formulas';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Props {
  value: number;
  label: string;
  suffix: string;
  baselineValue?: number;
}

const ResultHeader = ({ value, label, suffix, baselineValue }: Props) => {
  const delta = baselineValue !== undefined ? value - baselineValue : undefined;
  const isPositive = delta !== undefined ? delta >= 0 : true;

  return (
    <div className="mb-8">
      <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>
      <motion.div
        key={value}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
        className="flex items-end gap-4 flex-wrap"
      >
        <span className="big-number text-foreground">
          {formatNumber(value, suffix === '$' ? '$' : undefined)}
        </span>
        {suffix !== '$' && (
          <span className="text-2xl font-medium text-muted-foreground mb-2">{suffix}</span>
        )}
        {delta !== undefined && delta !== 0 && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold mb-2 ${
              isPositive
                ? 'bg-accent/10 text-accent'
                : 'bg-destructive/10 text-destructive'
            }`}
          >
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {isPositive ? '+' : ''}{formatNumber(delta, suffix === '$' ? '$' : undefined)}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
};

export default ResultHeader;
