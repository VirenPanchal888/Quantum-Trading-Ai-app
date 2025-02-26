
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Menu, 
  Search, 
  Wallet2, 
  Rocket, 
  ArrowLeft, 
  BarChart2,
  LineChart,
  ScanSearch,
  BookMarked,
  Newspaper,
  Settings as SettingsIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === "/";

  const navItems = [
    { name: "Market", path: "/", icon: Search },
    { name: "Portfolio", path: "/portfolio", icon: Wallet2 },
    { name: "Options", path: "/options", icon: BarChart2 },
    { name: "IPO", path: "/ipo", icon: Rocket },
    { name: "Market Analysis", path: "/market-analysis", icon: LineChart },
    { name: "Screener", path: "/screener", icon: ScanSearch },
    { name: "Watchlist", path: "/watchlist", icon: BookMarked },
    { name: "News", path: "/news", icon: Newspaper },
    { name: "Settings", path: "/settings", icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-black/40 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute right-2 top-2"
            onClick={() => setIsSidebarOpen(false)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Quantum TradeXpert
            </h2>
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 px-4 py-6 text-base ${
                  isActive(item.path) 
                    ? "bg-white/10 text-white" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => {
                  navigate(item.path);
                  setIsSidebarOpen(false);
                }}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="transition-all duration-300 md:ml-72">
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/40 border-b border-white/10">
          <div className="flex items-center h-16 px-6">
            {!isHomePage && (
              <Button
                variant="ghost"
                size="icon"
                className="mr-2"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
