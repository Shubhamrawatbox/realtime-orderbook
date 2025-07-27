"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type OrderbookRow = {
  price: string;
  size: string;
  isBest?: boolean;
};

type Props = {
  bids: OrderbookRow[];
  asks: OrderbookRow[];
};

export type OrderbookData = {
  OKX: Props;
  Bybit: Props;
  Deribit: Props;
};

export default function OrderbookTable({ bids, asks }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-900">
      <Table className="w-full text-sm">
        <TableHeader>
          <TableRow className=" text-white">
            <TableHead>Bid Price</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Ask Price</TableHead>
            <TableHead>Size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bids.map((_, i) => (
            <TableRow key={i}>
              {/* Bid Side */}
              <TableCell
                className={bids[i].isBest ? "text-green-500 font-bold" : ""}
              >
                {bids[i].price}
              </TableCell>
              <TableCell>{bids[i].size}</TableCell>

              {/* Ask Side */}
              <TableCell
                className={asks[i].isBest ? "text-red-500 font-bold" : ""}
              >
                {asks[i].price}
              </TableCell>
              <TableCell>{asks[i].size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
