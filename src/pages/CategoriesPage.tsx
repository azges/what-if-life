import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '@/data/simulators';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">Categories</h1>
        <p className="text-muted-foreground mb-8">Browse simulators by topic</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <Link
                to={`/category/${cat.slug}`}
                className="block shadow-card bg-card rounded-lg p-8 hover:shadow-card-hover transition-shadow group"
              >
                <span className="text-4xl mb-4 block">{cat.icon}</span>
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">{cat.name}</h2>
                <p className="text-sm text-muted-foreground">{cat.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
