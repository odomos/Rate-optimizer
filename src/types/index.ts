export type FareResult = {
  provider: "Uber" | "Ola" | "Rapido";
  price: number;
  duration: string;
  distance: string;
  icon: string;
  bookingUrl?: string;
};

export interface LocationInput {
  origin: string;
  destination: string;
}
