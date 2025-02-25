
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute right-2 top-2"
            onClick={() => setIsSidebarOpen(false)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <nav className="space-y-2 mt-8">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "default" : "ghost"}
                className={`w-full justify-start gap-2 ${
                  isActive(item.path) ? "" : "hover:bg-white/10"
                }`}
                onClick={() => {
                  navigate(item.path);
                  setIsSidebarOpen(false);
                }}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="md:ml-64">
        <header className="sticky top-0 z-10 backdrop-blur-xl bg-black/20 border-b border-white/10">
          <div className="flex items-center h-14 px-4">
            {!isHomePage && (
              <Button
                variant="ghost"
                size="icon"
                className="mr-2"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
