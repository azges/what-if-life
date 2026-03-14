import { useSearchParams } from 'react-router-dom';
import { searchSimulators } from '@/data/simulators';
import SimulatorCard from '@/components/SimulatorCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SearchPage = () => {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const results = searchSimulators(q);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Search results for "{q}"
        </h1>
        <p className="text-muted-foreground mb-8">{results.length} simulator{results.length !== 1 ? 's' : ''} found</p>
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((s, i) => (
              <SimulatorCard key={s.id} simulator={s} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No simulators match your search. Try different keywords.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
