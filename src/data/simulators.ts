export interface SimulatorInput {
  id: string;
  label: string;
  variableName: string;
  inputType: 'slider' | 'number';
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
}

export interface Simulator {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  formulaType: string;
  resultLabel: string;
  resultSuffix: string;
  inputs: SimulatorInput[];
  insights: string[];
  isTrending?: boolean;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  { id: '1', name: 'Finance', slug: 'finance', description: 'Investment, savings, and money scenarios', icon: '💰' },
  { id: '2', name: 'Health', slug: 'health', description: 'Physical and mental health impact simulations', icon: '❤️' },
  { id: '3', name: 'Productivity', slug: 'productivity', description: 'Time management and skill building', icon: '⚡' },
  { id: '4', name: 'Career', slug: 'career', description: 'Career growth and income scenarios', icon: '📈' },
  { id: '5', name: 'Lifestyle', slug: 'lifestyle', description: 'Daily habits and life choices', icon: '🌿' },
  { id: '6', name: 'Habits', slug: 'habits', description: 'Building and breaking habits', icon: '🔄' },
];

export const simulators: Simulator[] = [
  {
    id: '1', slug: 'save-5-dollars-per-day', title: 'What Happens If You Save $5 a Day?',
    description: 'See how a small daily saving habit compounds into serious wealth over time.',
    category: 'finance', formulaType: 'COST', resultLabel: 'Total Wealth', resultSuffix: '$',
    isTrending: true, isFeatured: true,
    inputs: [
      { id: '1a', label: 'Daily Savings', variableName: 'daily_cost', inputType: 'slider', defaultValue: 5, min: 1, max: 50, step: 1, suffix: '$' },
      { id: '1b', label: 'Years', variableName: 'years', inputType: 'slider', defaultValue: 30, min: 1, max: 50, step: 1, suffix: 'years' },
      { id: '1c', label: 'Investment Return', variableName: 'investment_rate', inputType: 'slider', defaultValue: 7, min: 1, max: 15, step: 0.5, suffix: '%' },
    ],
    insights: ['$5/day = $1,825/year, but invested it becomes much more.', 'Starting 10 years earlier can double your outcome.', 'Even small amounts benefit enormously from compound interest.'],
  },
  {
    id: '2', slug: 'invest-100-per-month', title: 'What Happens If You Invest $100 Per Month?',
    description: 'Discover the power of consistent monthly investing over decades.',
    category: 'finance', formulaType: 'COMPOUND', resultLabel: 'Portfolio Value', resultSuffix: '$',
    isTrending: true, isFeatured: true,
    inputs: [
      { id: '2a', label: 'Monthly Investment', variableName: 'monthly_contribution', inputType: 'slider', defaultValue: 100, min: 25, max: 2000, step: 25, suffix: '$' },
      { id: '2b', label: 'Starting Amount', variableName: 'starting_amount', inputType: 'slider', defaultValue: 0, min: 0, max: 50000, step: 500, suffix: '$' },
      { id: '2c', label: 'Annual Return', variableName: 'rate', inputType: 'slider', defaultValue: 7, min: 1, max: 15, step: 0.5, suffix: '%' },
      { id: '2d', label: 'Years', variableName: 'years', inputType: 'slider', defaultValue: 30, min: 1, max: 50, step: 1, suffix: 'years' },
    ],
    insights: ['Time in market beats timing the market.', 'A 7% return doubles your money every ~10 years.', 'Starting at 25 vs 35 could mean $200K+ difference by 65.'],
  },
  {
    id: '3', slug: 'invest-500-monthly-index-funds', title: 'What Happens If You Invest $500 Monthly in Index Funds?',
    description: 'Index fund investing is the most reliable wealth-building strategy. See the numbers.',
    category: 'finance', formulaType: 'COMPOUND', resultLabel: 'Portfolio Value', resultSuffix: '$',
    isFeatured: true,
    inputs: [
      { id: '3a', label: 'Monthly Investment', variableName: 'monthly_contribution', inputType: 'slider', defaultValue: 500, min: 100, max: 5000, step: 50, suffix: '$' },
      { id: '3b', label: 'Annual Return', variableName: 'rate', inputType: 'slider', defaultValue: 8, min: 4, max: 12, step: 0.5, suffix: '%' },
      { id: '3c', label: 'Years', variableName: 'years', inputType: 'slider', defaultValue: 25, min: 5, max: 40, step: 1, suffix: 'years' },
    ],
    insights: ['S&P 500 has averaged ~10% annual return since 1926.', 'Low-cost index funds minimize fees that eat returns.', 'Dollar-cost averaging reduces timing risk.'],
  },
  {
    id: '4', slug: 'coffee-every-day-40-years', title: 'What Happens If You Buy Coffee Every Day for 40 Years?',
    description: 'The true cost of your daily latte, calculated with investment opportunity cost.',
    category: 'lifestyle', formulaType: 'COST', resultLabel: 'Opportunity Cost', resultSuffix: '$',
    isTrending: true,
    inputs: [
      { id: '4a', label: 'Coffee Price', variableName: 'daily_cost', inputType: 'slider', defaultValue: 6, min: 2, max: 15, step: 0.5, suffix: '$' },
      { id: '4b', label: 'Years', variableName: 'years', inputType: 'slider', defaultValue: 40, min: 5, max: 50, step: 1, suffix: 'years' },
      { id: '4c', label: 'If Invested At', variableName: 'investment_rate', inputType: 'slider', defaultValue: 7, min: 0, max: 12, step: 0.5, suffix: '%' },
    ],
    insights: ['A $6 daily coffee costs $2,190/year.', 'Invested, that money could grow to 6 figures.', 'This isn\'t about quitting coffee—it\'s about awareness.'],
  },
  {
    id: '5', slug: 'smoking-pack-per-day-10-years', title: 'What Happens If You Smoke a Pack a Day for 10 Years?',
    description: 'Calculate the financial and health cost of a smoking habit over a decade.',
    category: 'health', formulaType: 'COST', resultLabel: 'Total Cost', resultSuffix: '$',
    isTrending: true,
    inputs: [
      { id: '5a', label: 'Pack Price', variableName: 'daily_cost', inputType: 'slider', defaultValue: 10, min: 5, max: 20, step: 0.5, suffix: '$' },
      { id: '5b', label: 'Years', variableName: 'years', inputType: 'slider', defaultValue: 10, min: 1, max: 30, step: 1, suffix: 'years' },
      { id: '5c', label: 'If Invested Instead', variableName: 'investment_rate', inputType: 'slider', defaultValue: 7, min: 0, max: 12, step: 0.5, suffix: '%' },
    ],
    insights: ['A pack-a-day habit costs $3,650+ per year.', 'Smoking reduces life expectancy by ~10 years on average.', 'Quitting at any age dramatically improves health outcomes.'],
  },
  {
    id: '6', slug: 'work-2-extra-hours-daily', title: 'What Happens If You Work 2 Extra Hours Daily?',
    description: 'See the cumulative time investment and potential income impact.',
    category: 'productivity', formulaType: 'HABIT', resultLabel: 'Extra Hours Worked', resultSuffix: 'hours',
    inputs: [
      { id: '6a', label: 'Extra Hours/Day', variableName: 'hours_per_day', inputType: 'slider', defaultValue: 2, min: 0.5, max: 5, step: 0.5, suffix: 'hrs' },
      { id: '6b', label: 'Days Per Week', variableName: 'days_per_week', inputType: 'slider', defaultValue: 5, min: 1, max: 7, step: 1, suffix: 'days' },
      { id: '6c', label: 'Years', variableName: 'years', inputType: 'slider', defaultValue: 10, min: 1, max: 30, step: 1, suffix: 'years' },
    ],
    insights: ['2 extra hours × 5 days = 520 extra hours/year.', 'That\'s equivalent to 65 additional 8-hour workdays.', 'Balance is key—burnout erases gains.'],
  },
  {
    id: '7', slug: 'learn-programming-2-hours-daily', title: 'What Happens If You Learn Programming 2 Hours Daily?',
    description: 'Track your path to mastery through consistent daily practice.',
    category: 'productivity', formulaType: 'HABIT', resultLabel: 'Total Practice Hours', resultSuffix: 'hours',
    isTrending: true, isFeatured: true,
    inputs: [
      { id: '7a', label: 'Hours Per Day', variableName: 'hours_per_day', inputType: 'slider', defaultValue: 2, min: 0.5, max: 6, step: 0.5, suffix: 'hrs' },
      { id: '7b', label: 'Days Per Week', variableName: 'days_per_week', inputType: 'slider', defaultValue: 5, min: 1, max: 7, step: 1, suffix: 'days' },
      { id: '7c', label: 'Years', variableName: 'years', inputType: 'slider', defaultValue: 5, min: 1, max: 20, step: 1, suffix: 'years' },
    ],
    insights: ['10,000 hours is the commonly cited mastery threshold.', '2 hrs/day × 5 days/week = ~520 hours/year.', 'Consistent practice beats sporadic intense sessions.'],
  },
  {
    id: '8', slug: 'gym-4-days-per-week', title: 'What Happens If You Train at the Gym 4 Days a Week?',
    description: 'Calculate your total training volume and commitment over years.',
    category: 'health', formulaType: 'HABIT', resultLabel: 'Total Training Hours', resultSuffix: 'hours',
    inputs: [
      { id: '8a', label: 'Hours Per Session', variableName: 'hours_per_day', inputType: 'slider', defaultValue: 1.5, min: 0.5, max: 3, step: 0.5, suffix: 'hrs' },
      { id: '8b', label: 'Days Per Week', variableName: 'days_per_week', inputType: 'slider', defaultValue: 4, min: 1, max: 7, step: 1, suffix: 'days' },
      { id: '8c', label: 'Years', variableName: 'years', inputType: 'slider', defaultValue: 10, min: 1, max: 30, step: 1, suffix: 'years' },
    ],
    insights: ['Consistent training 4x/week puts you in the top 5% of active people.', 'Strength peaks aren\'t reached until 5-7 years of training.', 'Rest days are when your body actually builds muscle.'],
  },
  {
    id: '9', slug: 'read-20-pages-daily', title: 'What Happens If You Read 20 Pages a Day?',
    description: 'See how a simple reading habit adds up to dozens of books per year.',
    category: 'habits', formulaType: 'LINEAR', resultLabel: 'Total Pages Read', resultSuffix: 'pages',
    inputs: [
      { id: '9a', label: 'Pages Per Day', variableName: 'daily_amount', inputType: 'slider', defaultValue: 20, min: 5, max: 100, step: 5, suffix: 'pages' },
      { id: '9b', label: 'Years', variableName: 'years', inputType: 'slider', defaultValue: 10, min: 1, max: 30, step: 1, suffix: 'years' },
    ],
    insights: ['20 pages/day ≈ 26 books/year (at 280 pages avg).', 'Warren Buffett reads 500 pages a day.', 'Reading 30 min before bed improves sleep quality.'],
  },
  {
    id: '10', slug: 'sleep-6-vs-8-hours', title: 'What Happens If You Sleep 6 vs 8 Hours?',
    description: 'Compare the cumulative sleep deficit and its impact on performance.',
    category: 'health', formulaType: 'HABIT', resultLabel: 'Hours of Sleep Lost', resultSuffix: 'hours',
    inputs: [
      { id: '10a', label: 'Hours Sleep Lost/Day', variableName: 'hours_per_day', inputType: 'slider', defaultValue: 2, min: 0.5, max: 4, step: 0.5, suffix: 'hrs' },
      { id: '10b', label: 'Days Per Week', variableName: 'days_per_week', inputType: 'slider', defaultValue: 7, min: 5, max: 7, step: 1, suffix: 'days' },
      { id: '10c', label: 'Years', variableName: 'years', inputType: 'slider', defaultValue: 10, min: 1, max: 30, step: 1, suffix: 'years' },
    ],
    insights: ['Sleep deprivation reduces cognitive performance by up to 40%.', '2 hours less sleep = 730 hours lost per year.', 'Chronic sleep debt increases disease risk significantly.'],
  },
  {
    id: '11', slug: 'quit-social-media', title: 'What Happens If You Quit Social Media?',
    description: 'Calculate the time you\'d reclaim by stepping away from social platforms.',
    category: 'lifestyle', formulaType: 'HABIT', resultLabel: 'Time Reclaimed', resultSuffix: 'hours',
    inputs: [
      { id: '11a', label: 'Hours on Social/Day', variableName: 'hours_per_day', inputType: 'slider', defaultValue: 3, min: 0.5, max: 8, step: 0.5, suffix: 'hrs' },
      { id: '11b', label: 'Days Per Week', variableName: 'days_per_week', inputType: 'slider', defaultValue: 7, min: 1, max: 7, step: 1, suffix: 'days' },
      { id: '11c', label: 'Years', variableName: 'years', inputType: 'slider', defaultValue: 5, min: 1, max: 20, step: 1, suffix: 'years' },
    ],
    insights: ['Average person spends 2.5 hours/day on social media.', 'That\'s 912 hours/year—or 38 full days.', 'Studies link reduced social media to improved mental health.'],
  },
  {
    id: '12', slug: 'pay-off-debt-extra-payments', title: 'What Happens If You Make Extra Debt Payments?',
    description: 'See how additional payments accelerate your debt payoff dramatically.',
    category: 'finance', formulaType: 'DEBT', resultLabel: 'Debt Remaining', resultSuffix: '$',
    isTrending: true,
    inputs: [
      { id: '12a', label: 'Debt Amount', variableName: 'debt_amount', inputType: 'slider', defaultValue: 20000, min: 1000, max: 100000, step: 1000, suffix: '$' },
      { id: '12b', label: 'Interest Rate', variableName: 'interest_rate', inputType: 'slider', defaultValue: 18, min: 3, max: 30, step: 0.5, suffix: '%' },
      { id: '12c', label: 'Monthly Payment', variableName: 'monthly_payment', inputType: 'slider', defaultValue: 400, min: 50, max: 3000, step: 50, suffix: '$' },
      { id: '12d', label: 'Extra Payment', variableName: 'extra_payment', inputType: 'slider', defaultValue: 100, min: 0, max: 1000, step: 25, suffix: '$' },
      { id: '12e', label: 'Years to Show', variableName: 'years', inputType: 'slider', defaultValue: 10, min: 1, max: 30, step: 1, suffix: 'years' },
    ],
    insights: ['Extra $100/month on $20K debt can save years of payments.', 'High-interest debt should be eliminated before investing.', 'The avalanche method (highest rate first) saves the most money.'],
  },
  {
    id: '13', slug: 'freelancing-income-growth', title: 'What Happens If You Start Freelancing?',
    description: 'Project your freelancing income growth with rate increases over time.',
    category: 'career', formulaType: 'COMPOUND', resultLabel: 'Cumulative Earnings', resultSuffix: '$',
    inputs: [
      { id: '13a', label: 'Monthly Income', variableName: 'monthly_contribution', inputType: 'slider', defaultValue: 2000, min: 500, max: 20000, step: 500, suffix: '$' },
      { id: '13b', label: 'Annual Growth Rate', variableName: 'rate', inputType: 'slider', defaultValue: 15, min: 0, max: 50, step: 1, suffix: '%' },
      { id: '13c', label: 'Years', variableName: 'years', inputType: 'slider', defaultValue: 10, min: 1, max: 20, step: 1, suffix: 'years' },
    ],
    insights: ['Top freelancers increase rates 10-20% annually.', 'Specialization commands premium pricing.', 'Building recurring revenue stabilizes freelance income.'],
  },
  {
    id: '14', slug: 'move-to-cheaper-country', title: 'What Happens If You Move to a Cheaper Country?',
    description: 'Calculate savings from geoarbitrage—earning in USD, living abroad.',
    category: 'lifestyle', formulaType: 'COST', resultLabel: 'Total Savings', resultSuffix: '$',
    inputs: [
      { id: '14a', label: 'Monthly Savings', variableName: 'monthly_cost', inputType: 'slider', defaultValue: 2000, min: 500, max: 5000, step: 100, suffix: '$' },
      { id: '14b', label: 'Years', variableName: 'years', inputType: 'slider', defaultValue: 5, min: 1, max: 20, step: 1, suffix: 'years' },
      { id: '14c', label: 'Investment Return', variableName: 'investment_rate', inputType: 'slider', defaultValue: 7, min: 0, max: 12, step: 0.5, suffix: '%' },
    ],
    insights: ['Living costs in Southeast Asia can be 60-70% less than US cities.', 'Remote workers can maintain US salaries while living abroad.', 'Tax implications vary—research your specific situation.'],
  },
  {
    id: '15', slug: 'save-instead-of-buying-coffee', title: 'What Happens If You Save Instead of Buying Coffee?',
    description: 'The classic latte factor: redirect your coffee budget into investments.',
    category: 'finance', formulaType: 'COST', resultLabel: 'Investment Value', resultSuffix: '$',
    inputs: [
      { id: '15a', label: 'Daily Coffee Cost', variableName: 'daily_cost', inputType: 'slider', defaultValue: 5, min: 2, max: 12, step: 0.5, suffix: '$' },
      { id: '15b', label: 'Years', variableName: 'years', inputType: 'slider', defaultValue: 20, min: 1, max: 40, step: 1, suffix: 'years' },
      { id: '15c', label: 'Investment Return', variableName: 'investment_rate', inputType: 'slider', defaultValue: 8, min: 0, max: 15, step: 0.5, suffix: '%' },
    ],
    insights: ['$5/day invested at 8% = $90K+ in 20 years.', 'Making coffee at home costs ~$0.50 per cup.', 'It\'s not about deprivation—it\'s about intentional spending.'],
  },
];

export const getSimulatorBySlug = (slug: string): Simulator | undefined =>
  simulators.find(s => s.slug === slug);

export const getSimulatorsByCategory = (categorySlug: string): Simulator[] =>
  simulators.filter(s => s.category === categorySlug);

export const getTrendingSimulators = (): Simulator[] =>
  simulators.filter(s => s.isTrending);

export const getFeaturedSimulators = (): Simulator[] =>
  simulators.filter(s => s.isFeatured);

export const searchSimulators = (query: string): Simulator[] => {
  const q = query.toLowerCase();
  return simulators.filter(s =>
    s.title.toLowerCase().includes(q) ||
    s.description.toLowerCase().includes(q) ||
    s.category.toLowerCase().includes(q)
  );
};
