export type DataPoint = { x: number; y: number; contributed?: number };

export const calculateScenario = (
  type: string,
  inputs: Record<string, number>
): DataPoint[] => {
  const data: DataPoint[] = [];
  const years = inputs.years || 30;

  switch (type) {
    case 'COMPOUND': {
      let balance = inputs.starting_amount || 0;
      const monthly = inputs.monthly_contribution || 0;
      const rate = (inputs.rate || 7) / 100;
      let totalContributed = balance;
      for (let i = 0; i <= years; i++) {
        data.push({ x: i, y: Math.round(balance), contributed: Math.round(totalContributed) });
        balance = (balance + monthly * 12) * (1 + rate);
        totalContributed += monthly * 12;
      }
      break;
    }
    case 'LINEAR': {
      const daily = inputs.daily_amount || 0;
      const monthly = inputs.monthly_amount || 0;
      const yearly = daily * 365 + monthly * 12;
      for (let i = 0; i <= years; i++) {
        data.push({ x: i, y: Math.round(yearly * i) });
      }
      break;
    }
    case 'COST': {
      const dailyCost = inputs.daily_cost || 0;
      const monthlyCost = inputs.monthly_cost || 0;
      const yearlyCost = dailyCost * 365 + monthlyCost * 12;
      const rate = (inputs.investment_rate || 7) / 100;
      let invested = 0;
      for (let i = 0; i <= years; i++) {
        data.push({ x: i, y: Math.round(invested) });
        invested = (invested + yearlyCost) * (1 + rate);
      }
      break;
    }
    case 'HABIT': {
      const hoursPerDay = inputs.hours_per_day || 1;
      const daysPerWeek = inputs.days_per_week || 5;
      for (let i = 0; i <= years; i++) {
        const totalHours = hoursPerDay * daysPerWeek * 52 * i;
        data.push({ x: i, y: Math.round(totalHours) });
      }
      break;
    }
    case 'HEALTH': {
      const baseline = inputs.baseline || 100;
      const impactPerYear = inputs.impact_per_year || -2;
      for (let i = 0; i <= years; i++) {
        data.push({ x: i, y: Math.round(baseline + impactPerYear * i) });
      }
      break;
    }
    case 'DEBT': {
      let balance = inputs.debt_amount || 10000;
      const monthlyPayment = inputs.monthly_payment || 200;
      const rate = (inputs.interest_rate || 18) / 100 / 12;
      const extraPayment = inputs.extra_payment || 0;
      for (let i = 0; i <= years * 12 && balance > 0; i++) {
        if (i % 12 === 0) {
          data.push({ x: i / 12, y: Math.round(Math.max(0, balance)) });
        }
        const interest = balance * rate;
        balance = balance + interest - monthlyPayment - extraPayment;
      }
      if (data.length > 0 && data[data.length - 1].y > 0) {
        data.push({ x: data[data.length - 1].x + 1, y: 0 });
      }
      break;
    }
    default: {
      for (let i = 0; i <= years; i++) {
        data.push({ x: i, y: i * 100 });
      }
    }
  }

  return data;
};

export const formatCurrency = (value: number): string => {
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`;
  }
  return `$${value.toLocaleString()}`;
};

export const formatNumber = (value: number, suffix?: string): string => {
  if (suffix === '$' || suffix === 'dollars') return formatCurrency(value);
  if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M${suffix ? ' ' + suffix : ''}`;
  if (Math.abs(value) >= 1_000) return `${(value / 1_000).toFixed(1)}K${suffix ? ' ' + suffix : ''}`;
  return `${value.toLocaleString()}${suffix ? ' ' + suffix : ''}`;
};
