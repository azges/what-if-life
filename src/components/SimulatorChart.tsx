import { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { DataPoint, formatNumber } from '@/lib/formulas';

interface Props {
  data: DataPoint[];
  comparisonData?: DataPoint[];
  suffix?: string;
  label?: string;
  comparisonLabel?: string;
}

const CustomTooltip = ({ active, payload, label, suffix }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg px-4 py-3 shadow-card-hover bg-card/90 backdrop-blur-md border-0">
      <p className="text-xs font-medium text-muted-foreground mb-1">Year {label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-sm font-semibold tabular-nums" style={{ color: p.color }}>
          {p.name}: {formatNumber(p.value, suffix === '$' ? '$' : undefined)}{suffix !== '$' ? ` ${suffix || ''}` : ''}
        </p>
      ))}
    </div>
  );
};

const SimulatorChart = ({ data, comparisonData, suffix, label = 'Scenario A', comparisonLabel = 'Scenario B' }: Props) => {
  const chartData = useMemo(() => {
    return data.map((d, i) => ({
      year: d.x,
      [label]: d.y,
      contributed: d.contributed,
      ...(comparisonData?.[i] ? { [comparisonLabel]: comparisonData[i].y } : {}),
    }));
  }, [data, comparisonData, label, comparisonLabel]);

  const hasContributed = data.some(d => d.contributed !== undefined);

  return (
    <div className="w-full h-80 sm:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.15} />
              <stop offset="100%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="accentGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.15} />
              <stop offset="100%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="contributedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(215, 16%, 47%)" stopOpacity={0.1} />
              <stop offset="100%" stopColor="hsl(215, 16%, 47%)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 40%, 96%)" horizontal vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: 'hsl(215, 16%, 47%)' }}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Years', position: 'insideBottom', offset: -5, fontSize: 11, fill: 'hsl(215, 16%, 47%)' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: 'hsl(215, 16%, 47%)' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => formatNumber(v, suffix === '$' ? '$' : undefined)}
            width={70}
          />
          <Tooltip content={<CustomTooltip suffix={suffix} />} />
          {hasContributed && (
            <Area
              type="monotone"
              dataKey="contributed"
              stroke="hsl(215, 16%, 47%)"
              strokeWidth={1}
              strokeDasharray="4 4"
              fill="url(#contributedGradient)"
              name="Contributed"
            />
          )}
          <Area
            type="monotone"
            dataKey={label}
            stroke="hsl(221, 83%, 53%)"
            strokeWidth={2}
            fill="url(#primaryGradient)"
            animationDuration={600}
            animationEasing="ease-out"
          />
          {comparisonData && (
            <Area
              type="monotone"
              dataKey={comparisonLabel}
              stroke="hsl(142, 71%, 45%)"
              strokeWidth={2}
              strokeDasharray="6 4"
              fill="url(#accentGradient)"
              animationDuration={600}
              animationEasing="ease-out"
            />
          )}
          {(comparisonData || hasContributed) && <Legend />}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimulatorChart;
