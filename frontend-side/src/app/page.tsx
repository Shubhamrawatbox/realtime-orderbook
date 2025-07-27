// src/components/OrderForm.tsx

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "sonner";

// 1. Enhanced Zod Schema for more precise validation
const formSchema = z
  .object({
    venue: z.enum(["OKX", "Bybit", "Deribit"], {
      required_error: "You need to select a venue.",
    }),
    symbol: z.enum(["BTC-USD", "ETH-USD", "SOL-USD"], {
      // Changed to enum for valid options
      required_error: "A symbol is required.",
    }),
    orderType: z.enum(["Market", "Limit"], {
      required_error: "Order type is required.",
    }),
    side: z.enum(["Buy", "Sell"], {
      required_error: "Side is required.",
    }),
    price: z.string().optional(),
    quantity: z
      .string()
      .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
        message: "Quantity must be a positive number.", // More specific validation
      }),
    timing: z.enum(["immediate", "5s", "10s", "30s"], {
      required_error: "Timing simulation is required.",
    }),
  })
  .refine(
    (data) => {
      // Conditionally require 'price' only for 'Limit' orders
      if (data.orderType === "Limit") {
        return (
          data.price &&
          !isNaN(parseFloat(data.price)) &&
          parseFloat(data.price) > 0
        );
      }
      return true;
    },
    {
      message:
        "Price is required for Limit orders and must be a positive number.",
      path: ["price"], // Apply the error message to the 'price' field
    }
  );

export default function OrderForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      venue: "OKX",
      symbol: "BTC-USD",
      orderType: "Market",
      side: "Buy",
      timing: "immediate",
      quantity: "",
      price: "",
    },
  });

  // Watch 'orderType' to conditionally render the price field
  const orderType = form.watch("orderType");

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // You can add the timing simulation logic here
    console.log("Order submitted:", data);
    toast("tested");
  };

  // 2. Refactored form structure using shadcn/ui's Form components
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-6 space-y-6 border rounded-lg"
        >
          <h2 className="text-2xl font-bold">Order Simulation</h2>

          {/* Venue */}
          <FormField
            control={form.control}
            name="venue"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Venue</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="OKX" id="okx" />
                      </FormControl>
                      <FormLabel htmlFor="okx" className="font-normal">
                        OKX
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="Bybit" id="bybit" />
                      </FormControl>
                      <FormLabel htmlFor="bybit" className="font-normal">
                        Bybit
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="Deribit" id="deribit" />
                      </FormControl>
                      <FormLabel htmlFor="deribit" className="font-normal">
                        Deribit
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Symbol */}
          <FormField
            control={form.control}
            name="symbol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Symbol</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a symbol" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="BTC-USD">BTC-USD</SelectItem>
                    <SelectItem value="ETH-USD">ETH-USD</SelectItem>
                    <SelectItem value="SOL-USD">SOL-USD</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Order Type and Side */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="orderType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Type</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="w-full"
                    >
                      <ToggleGroupItem
                        value="Market"
                        className="w-1/2 data-[state=on]:bg-black data-[state=on]:text-white"
                      >
                        Market
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="Limit"
                        className="w-1/2 data-[state=on]:bg-black data-[state=on]:text-white"
                      >
                        Limit
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="side"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Side</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="w-full"
                    >
                      <ToggleGroupItem
                        value="Buy"
                        className="w-1/2 data-[state=on]:bg-black data-[state=on]:text-white"
                      >
                        Buy
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="Sell"
                        className="w-1/2 data-[state=on]:bg-black data-[state=on]:text-white"
                      >
                        Sell
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Price and Quantity */}
          <div className="grid grid-cols-2 gap-4">
            {/* Price (Conditional) */}
            {orderType === "Limit" && (
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem
                  className={orderType === "Market" ? "col-span-2" : ""}
                >
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter quantity"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Timing Simulation */}
          <FormField
            control={form.control}
            name="timing"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timing Simulation</FormLabel>
                <FormControl>
                  <ToggleGroup
                    type="single"
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    className="flex flex-wrap gap-2"
                  >
                    <ToggleGroupItem
                      value="immediate"
                      className="w-55 data-[state=on]:bg-black data-[state=on]:text-white"
                    >
                      Immediate
                    </ToggleGroupItem>

                    <ToggleGroupItem
                      value="5s"
                      className="data-[state=on]:bg-black data-[state=on]:text-white"
                    >
                      5s
                    </ToggleGroupItem>

                    <ToggleGroupItem
                      value="10s"
                      className="data-[state=on]:bg-black data-[state=on]:text-white"
                    >
                      10s
                    </ToggleGroupItem>

                    <ToggleGroupItem
                      value="30s"
                      className="data-[state=on]:bg-black data-[state=on]:text-white"
                    >
                      30s
                    </ToggleGroupItem>
                  </ToggleGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Simulate Order
          </Button>
        </form>
      </Form>
    </div>
  );
}
