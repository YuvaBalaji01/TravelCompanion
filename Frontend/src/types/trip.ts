export interface Trip {
  id: number;
  destination: string;
  start_date: string;
  end_date: string;
  user_id: number;
  description?: string | null;
}

export interface SearchResult {
  id: number;
  name: string;
  email: string;
  bio?: string;

  destination: string;
  start_date: string;
  end_date: string;
}

export interface CreateTripRequest {
  destination: string;
  start_date: string;
  end_date: string;
  description?: string;
}