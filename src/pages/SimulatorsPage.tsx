import { simulators } from '@/data/simulators';
import SimulatorCard from '@/components/SimulatorCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SimulatorsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">All Simulators</h1>
        <p className="text-muted-foreground mb-8">{simulators.length} interactive scenario calculators</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {simulators.map((s, i) => (
            <SimulatorCard key={s.id} simulator={s} index={i} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SimulatorsPage;
