
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { stockList } from "@/data/stockList";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Screener = () => {
  const [minMarketCap, setMinMarketCap] = useState("");
  const [sector, setSector] = useState("");
  
  const filteredStocks = stockList.filter(stock => {
    if (sector && stock.sector !== sector) return false;
    if (minMarketCap) {
      const marketCapValue = parseFloat(stock.marketCap.replace(/[TB]/g, ""));
      const multiplier = stock.marketCap.includes("T") ? 1000 : 1;
      if (marketCapValue * multiplier < parseFloat(minMarketCap)) return false;
    }
    return true;
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold text-white">Stock Screener</h1>
        
        <Card className="p-6 bg-white/5 backdrop-blur-lg border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm text-gray-400">Min Market Cap (B)</label>
              <Input
                type="number"
                value={minMarketCap}
                onChange={(e) => setMinMarketCap(e.target.value)}
                placeholder="Enter minimum market cap"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Sector</label>
              <Input
                type="text"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                placeholder="Enter sector"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticker</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Market Cap</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStocks.map((stock) => (
                <TableRow key={stock.ticker}>
                  <TableCell className="font-medium">{stock.ticker}</TableCell>
                  <TableCell>{stock.name}</TableCell>
                  <TableCell>{stock.sector}</TableCell>
                  <TableCell>{stock.marketCap}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </Layout>
  );
};

export default Screener;
