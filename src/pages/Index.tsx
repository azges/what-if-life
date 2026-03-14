import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, TrendingUp, Zap } from 'lucide-react';
import { getFeaturedSimulators, getTrendingSimulators, categories, simulators } from '@/data/simulators';
import SimulatorCard from '@/components/SimulatorCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const featured = getFeaturedSimulators();
  const trending = getTrendingSimulators();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="container mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight max-w-3xl mx-auto">
            Simulate decisions.<br />
            <span className="gradient-text">See the outcome.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
            Interactive calculators that show the long-term impact of everyday choices across finance, health, and productivity.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSearch}
          className="mt-10 max-w-md mx-auto relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search simulators — try 'investing' or 'coffee'"
            className="w-full pl-11 pr-4 py-3 rounded-lg bg-card shadow-card text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:shadow-card-hover transition-shadow"
          />
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> Instant results</span>
          <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> {simulators.length} simulators</span>
        </motion.div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 sm:px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Featured Simulators</h2>
          <Link to="/simulators" className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((s, i) => (
            <SimulatorCard key={s.id} simulator={s} index={i} />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="container mx-auto px-4 sm:px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Trending
          </h2>
          <Link to="/trending" className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trending.slice(0, 6).map((s, i) => (
            <SimulatorCard key={s.id} simulator={s} index={i} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 sm:px-6 pb-16">
        <h2 className="text-xl font-bold text-foreground mb-6">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <Link
                to={`/category/${cat.slug}`}
                className="block shadow-card bg-card rounded-lg p-5 text-center hover:shadow-card-hover transition-shadow group"
              >
                <span className="text-2xl mb-2 block">{cat.icon}</span>
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 sm:px-6 pb-16">
        <h2 className="text-xl font-bold text-foreground mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { step: '01', title: 'Choose a Scenario', desc: 'Pick from hundreds of life, finance, and health simulators.' },
            { step: '02', title: 'Adjust Inputs', desc: 'Use sliders to set your personal variables and assumptions.' },
            { step: '03', title: 'See the Impact', desc: 'Instantly view long-term results with charts and comparisons.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary/20 mb-2">{item.step}</div>
              <h3 className="text-sm font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
