import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SimulatorInput } from '@/data/simulators';

interface Props {
  inputs: SimulatorInput[];
  values: Record<string, number>;
  onChange: (variableName: string, value: number) => void;
}

const SimulatorInputPanel = ({ inputs, values, onChange }: Props) => {
  return (
    <div className="space-y-6">
      {inputs.map((input) => (
        <InputCard
          key={input.id}
          input={input}
          value={values[input.variableName] ?? input.defaultValue}
          onChange={(v) => onChange(input.variableName, v)}
        />
      ))}
    </div>
  );
};

const InputCard = ({ input, value, onChange }: { input: SimulatorInput; value: number; onChange: (v: number) => void }) => {
  const [localValue, setLocalValue] = useState(String(value));
  
  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setLocalValue(String(v));
    onChange(v);
  }, [onChange]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    const v = parseFloat(e.target.value);
    if (!isNaN(v) && v >= input.min && v <= input.max) {
      onChange(v);
    }
  }, [onChange, input.min, input.max]);

  const handleBlur = useCallback(() => {
    setLocalValue(String(value));
  }, [value]);

  const percentage = ((value - input.min) / (input.max - input.min)) * 100;

  return (
    <motion.div
      className="rounded-lg p-5 shadow-card bg-card transition-shadow duration-200 hover:shadow-card-hover"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
    >
      <div className="flex items-center justify-between mb-4">
        <label className="text-sm font-medium text-foreground">{input.label}</label>
        <div className="flex items-center gap-1">
          <input
            type="text"
            value={localValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="w-20 text-right text-sm font-semibold tabular-nums bg-secondary text-foreground rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-primary/20"
          />
          <span className="text-xs text-muted-foreground font-medium">{input.suffix}</span>
        </div>
      </div>
      <div className="relative">
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-100"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min={input.min}
          max={input.max}
          step={input.step}
          value={value}
          onChange={handleSliderChange}
          className="absolute inset-0 w-full h-1.5 opacity-0 cursor-pointer"
          style={{ top: '0' }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-card border-2 border-primary rounded-full shadow-sm pointer-events-none transition-all duration-100"
          style={{ left: `calc(${percentage}% - 10px)` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-xs text-muted-foreground tabular-nums">{input.min}{input.suffix === '%' ? '%' : ''}</span>
        <span className="text-xs text-muted-foreground tabular-nums">{input.max}{input.suffix === '%' ? '%' : ''}</span>
      </div>
    </motion.div>
  );
};

export default SimulatorInputPanel;
