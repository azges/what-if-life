import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-secondary/30 mt-24">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">W</span>
              </div>
              <span className="font-semibold text-foreground text-sm">What Happens If</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Interactive scenario simulators for life decisions.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Explore</h4>
            <div className="space-y-2">
              <Link to="/simulators" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">All Simulators</Link>
              <Link to="/categories" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Categories</Link>
              <Link to="/trending" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Trending</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Popular</h4>
            <div className="space-y-2">
              <Link to="/simulator/invest-100-per-month" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Invest $100/Month</Link>
              <Link to="/simulator/save-5-dollars-per-day" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Save $5/Day</Link>
              <Link to="/simulator/learn-programming-2-hours-daily" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Learn Programming</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Categories</h4>
            <div className="space-y-2">
              <Link to="/category/finance" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Finance</Link>
              <Link to="/category/health" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Health</Link>
              <Link to="/category/productivity" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Productivity</Link>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground text-center">
            Results are estimates for educational purposes. Actual outcomes vary based on market conditions and individual circumstances.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
