import { useParams } from 'react-router-dom';
import { getSimulatorsByCategory, categories } from '@/data/simulators';
import SimulatorCard from '@/components/SimulatorCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find(c => c.slug === slug);
  const sims = getSimulatorsByCategory(slug || '');

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold text-foreground">Category not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{category.icon}</span>
          <h1 className="text-3xl font-bold text-foreground">{category.name}</h1>
        </div>
        <p className="text-muted-foreground mb-8">{category.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sims.map((s, i) => (
            <SimulatorCard key={s.id} simulator={s} index={i} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
