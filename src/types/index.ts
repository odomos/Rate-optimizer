export interface FareResult {
  provider: string;
  price: number;
  duration?: string;
  distance?: string;
  icon?: string;
}

export interface LocationInput {
  origin: string;
  destination: string;
}
