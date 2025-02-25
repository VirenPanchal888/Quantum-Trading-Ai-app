
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";

const mockNews = [
  {
    id: 1,
    title: "Fed Holds Interest Rates Steady",
    source: "Financial Times",
    date: "2024-03-20",
    summary: "Federal Reserve maintains current interest rates while monitoring inflation...",
    category: "Economy"
  },
  // Add more mock news items
];

const News = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold text-white">Market News</h1>
        
        <div className="grid grid-cols-1 gap-6">
          {mockNews.map((news) => (
            <Card key={news.id} className="p-6 bg-white/5 backdrop-blur-lg border-white/10">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-white">{news.title}</h2>
                <span className="text-sm text-gray-400">{news.date}</span>
              </div>
              <p className="text-gray-300 mb-4">{news.summary}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">{news.source}</span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-gray-300">
                  {news.category}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default News;
