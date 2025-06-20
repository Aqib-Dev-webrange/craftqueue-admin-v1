import type { TransformedUpholsteryOrder } from "@/types/upholstery";

export function generateSearchSuggestions(data: TransformedUpholsteryOrder[]): string[] {
  const dynamicSuggestions = [
    ...data.map((quote) => quote.furniture),
    ...data.map((quote) => quote.status),
    ...data.map((quote) => quote.priority),
    ...data.map((quote) => quote.customer),
  ].filter(Boolean);

  const staticSuggestions = [
    "High Priority",
    "Normal Priority",
    "pending",
    "processing",
    "dispatched",
    "en_route",
    "delivered",
    "Ottoman",
    "Sofa",
    "Chair",
  ];

  return [...new Set([...dynamicSuggestions, ...staticSuggestions])];
}







