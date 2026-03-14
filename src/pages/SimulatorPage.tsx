import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, GitCompare, Lightbulb } from 'lucide-react';
import { getSimulatorBySlug, simulators as allSimulators, categories } from '@/data/simulators';
import { calculateScenario, formatNumber } from '@/lib/formulas';
import SimulatorInputPanel from '@/components/SimulatorInputPanel';
import ResultHeader from '@/components/ResultHeader';
import SimulatorChart from '@/components/SimulatorChart';
import SimulatorCard from '@/components/SimulatorCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SimulatorPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const simulator = getSimulatorBySlug(slug || '');

  const [values, setValues] = useState<Record<string, number>>(() => {
    if (!simulator) return {};
    return Object.fromEntries(simulator.inputs.map(i => [i.variableName, i.defaultValue]));
  });

  const [compareMode, setCompareMode] = useState(false);
  const [compareValues, setCompareValues] = useState<Record<string, number>>(() => {
    if (!simulator) return {};
    return Object.fromEntries(simulator.inputs.map(i => [i.variableName, i.defaultValue]));
  });

  const handleChange = (name: string, value: number) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleCompareChange = (name: string, value: number) => {
    setCompareValues(prev => ({ ...prev, [name]: value }));
  };

  const data = useMemo(() => {
    if (!simulator) return [];
    return calculateScenario(simulator.formulaType, values);
  }, [simulator, values]);

  const comparisonData = useMemo(() => {
    if (!simulator || !compareMode) return undefined;
    return calculateScenario(simulator.formulaType, compareValues);
  }, [simulator, compareMode, compareValues]);

  const finalValue = data.length > 0 ? data[data.length - 1].y : 0;
  const compFinalValue = comparisonData?.length ? comparisonData[comparisonData.length - 1].y : undefined;

  const relatedSimulators = useMemo(() => {
    if (!simulator) return [];
    return allSimulators
      .filter(s => s.category === simulator.category && s.id !== simulator.id)
      .slice(0, 3);
  }, [simulator]);

  const category = categories.find(c => c.slug === simulator?.category);

  if (!simulator) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 py-24 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Simulator Not Found</h1>
          <Link to="/simulators" className="text-sm text-primary hover:underline">Browse all simulators</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleShare = async () => {
    const text = `${simulator.title} — Result: ${formatNumber(finalValue, simulator.resultSuffix === '$' ? '$' : undefined)}${simulator.resultSuffix !== '$' ? ' ' + simulator.resultSuffix : ''}`;
    if (navigator.share) {
      await navigator.share({ title: simulator.title, text, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <Link to="/simulators" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> All Simulators
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md">
              {category?.icon} {category?.name}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">{simulator.title}</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">{simulator.description}</p>
        </div>

        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setCompareMode(!compareMode)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              compareMode ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            <GitCompare className="w-4 h-4" /> Compare
          </button>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
          >
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div>
                <h2 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-4">
                  {compareMode ? 'Scenario A' : 'Adjust Inputs'}
                </h2>
                <SimulatorInputPanel inputs={simulator.inputs} values={values} onChange={handleChange} />
              </div>
              {compareMode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <h2 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-4">Scenario B</h2>
                  <SimulatorInputPanel inputs={simulator.inputs} values={compareValues} onChange={handleCompareChange} />
                </motion.div>
              )}
            </div>
          </div>

          {/* Results Dashboard */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="shadow-card bg-card rounded-lg p-6 sm:p-8 mb-8">
              <ResultHeader
                value={finalValue}
                label={simulator.resultLabel}
                suffix={simulator.resultSuffix}
                baselineValue={compFinalValue}
              />
              <SimulatorChart
                data={data}
                comparisonData={comparisonData}
                suffix={simulator.resultSuffix}
                label={compareMode ? 'Scenario A' : simulator.resultLabel}
                comparisonLabel="Scenario B"
              />
            </div>

            {/* Yearly Breakdown */}
            <div className="shadow-card bg-card rounded-lg p-6 mb-8">
              <h3 className="text-sm font-semibold text-foreground mb-4">Yearly Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground text-left">
                      <th className="pb-3 font-medium">Year</th>
                      <th className="pb-3 font-medium text-right">{compareMode ? 'Scenario A' : 'Value'}</th>
                      {data[0]?.contributed !== undefined && <th className="pb-3 font-medium text-right">Contributed</th>}
                      {compareMode && <th className="pb-3 font-medium text-right">Scenario B</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {data.filter((_, i) => i % Math.max(1, Math.floor(data.length / 10)) === 0 || i === data.length - 1).map((d, i) => (
                      <tr key={i} className="border-t border-border/50">
                        <td className="py-2.5 tabular-nums text-foreground">{d.x}</td>
                        <td className="py-2.5 tabular-nums text-right font-medium text-foreground">
                          {formatNumber(d.y, simulator.resultSuffix === '$' ? '$' : undefined)}
                        </td>
                        {d.contributed !== undefined && (
                          <td className="py-2.5 tabular-nums text-right text-muted-foreground">
                            {formatNumber(d.contributed, '$')}
                          </td>
                        )}
                        {compareMode && comparisonData?.[data.indexOf(d)] && (
                          <td className="py-2.5 tabular-nums text-right text-muted-foreground">
                            {formatNumber(comparisonData[data.indexOf(d)].y, simulator.resultSuffix === '$' ? '$' : undefined)}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Insights */}
            <div className="shadow-card bg-card rounded-lg p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Key Insights</h3>
              </div>
              <ul className="space-y-3">
                {simulator.insights.map((insight, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Simulators */}
        {relatedSimulators.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-foreground mb-6">Related Simulators</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedSimulators.map((s, i) => (
                <SimulatorCard key={s.id} simulator={s} index={i} />
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SimulatorPage;
