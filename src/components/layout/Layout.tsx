
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, Search, Wallet2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: "Market", path: "/", icon: Search },
    { name: "Portfolio", path: "/portfolio", icon: Wallet2 },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Quantum TradeXpert
          </h1>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={`w-full justify-start px-6 py-3 ${
                isActive(item.path)
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-64"
        }`}
      >
        <header className="sticky top-0 z-40 bg-black/20 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center justify-between px-6 py-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
