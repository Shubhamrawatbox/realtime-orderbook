"use client";

import OrderbookTable, {
  OrderbookData,
  OrderbookRow,
} from "@/components/custom/orderbooktable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";

export default function OrderbookTabs() {
  const [data, setData] = useState<OrderbookData | null>(null);

  useEffect(() => {
    const generateMock = (): OrderbookRow[] =>
      Array.from({ length: 15 }, (_, i) => ({
        price: (55000 + i * 2).toFixed(1),
        size: (Math.random() * 2).toFixed(3),
        isBest: i === 0,
      }));

    const mockData: OrderbookData = {
      OKX: { bids: generateMock(), asks: generateMock() },
      Bybit: { bids: generateMock(), asks: generateMock() },
      Deribit: { bids: generateMock(), asks: generateMock() },
    };

    setData(mockData);
  }, []);

  if (!data) return null;

  return (
    <div className="p-6 bg-zinc-800  shadow-lg">
    <h2 className="text-2xl text-white font-bold mb-2 text-center">
        Multi-Venue Orderbook Display
      </h2>
    <div className="w-full max-w-6xl mx-auto mt-4 bg-zinc-900 p-6 rounded-xl shadow-xl text-white">
      
      <Tabs defaultValue="OKX" className="w-full">
        <TabsList className="flex justify-center bg-zinc-800 mb-4 rounded-md">
          {Object.keys(data).map((venue) => (
            <TabsTrigger key={venue} value={venue} className="px-6 py-2">
              {venue}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(data).map(([venue, { bids, asks }]) => (
          <TabsContent key={venue} value={venue}>
            <OrderbookTable bids={bids} asks={asks} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
    </div>
  );
}
