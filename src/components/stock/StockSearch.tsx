
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { stockList, Stock } from "@/data/stockList";

interface StockSearchProps {
  onSelect: (stock: Stock) => void;
}

const StockSearch = ({ onSelect }: StockSearchProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  const filteredAndGroupedStocks = useMemo(() => {
    const searchLower = searchValue.toLowerCase();
    const filtered = stockList.filter(
      (stock) =>
        stock.ticker.toLowerCase().includes(searchLower) ||
        stock.name.toLowerCase().includes(searchLower)
    );

    return filtered.reduce((acc, stock) => {
      if (!acc[stock.sector]) {
        acc[stock.sector] = [];
      }
      acc[stock.sector].push(stock);
      return acc;
    }, {} as Record<string, Stock[]>);
  }, [searchValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-white/5 border-white/10 text-white hover:bg-white/10"
        >
          {selectedStock ? selectedStock.ticker : "Search stocks..."}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput 
            placeholder="Search by ticker or company name..."
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>No stocks found.</CommandEmpty>
            {Object.entries(filteredAndGroupedStocks).map(([sector, stocks]) => (
              <CommandGroup key={sector} heading={sector}>
                {stocks.map((stock) => (
                  <CommandItem
                    key={stock.ticker}
                    onSelect={() => {
                      setSelectedStock(stock);
                      onSelect(stock);
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <span className="font-medium">{stock.ticker}</span>
                        <span className="ml-2 text-sm text-gray-500">
                          {stock.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">{stock.marketCap}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StockSearch;
