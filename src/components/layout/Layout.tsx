
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
        className={`fixed top-0 left-0 h-full w-64 bg-black/20 backdrop